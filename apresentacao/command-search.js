(function (global) {
  "use strict";

  const COMMON = [
    "docker",
    "docker run",
    "docker ps",
    "docker exec",
    "docker pull",
    "docker images",
    "docker build",
    "docker logs",
    "docker stop",
    "docker start",
    "docker rm",
    "docker inspect",
    "docker compose",
    "docker compose up",
    "docker compose down",
    "docker compose ps",
    "docker compose logs",
    "docker image",
    "docker container",
    "docker network",
    "docker volume",
    "docker buildx",
  ];
  const commonOrder = new Map(COMMON.map((command, index) => [command, index]));
  const normalize = (value) =>
    String(value || "")
      .trim()
      .replace(/\s+/g, " ");
  const words = (value) =>
    normalize(value).toLowerCase().split(" ").filter(Boolean);
  const withoutDocker = (tokens) =>
    tokens[0] === "docker" ? tokens.slice(1) : tokens;
  const lexical = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

  function flagNames(record) {
    return (record.flags || []).flatMap((flag) => {
      if (typeof flag === "string") return [flag];
      return [flag.name, flag.flag, ...(flag.aliases || [])].filter(Boolean);
    });
  }

  function commandRank(commandTokens, queryTokens) {
    if (!queryTokens.length) return 0;
    const command = commandTokens.join(" ");
    const query = queryTokens.join(" ");
    if (command === query) return 0;
    // A sequência completa deve corresponder a tokens consecutivos; "ps"
    // não pode encontrar "inspect" só porque há essas letras na descrição.
    let best = Infinity;
    for (
      let start = 0;
      start <= commandTokens.length - queryTokens.length;
      start++
    ) {
      if (
        !queryTokens.every((token, index) =>
          commandTokens[start + index].startsWith(token),
        )
      )
        continue;
      const exactTokens = queryTokens.every(
        (token, index) => commandTokens[start + index] === token,
      );
      const endsHere = start + queryTokens.length === commandTokens.length;
      const rank = exactTokens
        ? start === 0
          ? 10
          : endsHere
            ? 20
            : 30
        : start === 0
          ? 40
          : endsHere
            ? 50
            : 60;
      best = Math.min(best, rank);
    }
    return best;
  }

  function search(records, rawQuery) {
    const query = normalize(rawQuery);
    const queryParts = query.split(" ").filter(Boolean);
    const queryFlags = queryParts.filter((part) => part.startsWith("-"));
    const commandQuery = withoutDocker(
      queryParts
        .filter((part) => !part.startsWith("-"))
        .map((part) => part.toLowerCase()),
    );
    const results = [];
    for (const record of records || []) {
      const command = normalize(record.command);
      // Uma entrada representa um comando; exemplos com flags não são headings.
      if (!command || command.split(" ").some((part) => part.startsWith("-")))
        continue;
      const commandTokens = withoutDocker(words(command));
      const rank = commandRank(commandTokens, commandQuery);
      if (!Number.isFinite(rank)) continue;
      const names = flagNames(record);
      if (
        !queryFlags.every((queryFlag) =>
          names.some((name) => name.startsWith(queryFlag)),
        )
      )
        continue;
      const flagRank = queryFlags.reduce(
        (sum, queryFlag) => sum + (names.includes(queryFlag) ? 0 : 1),
        0,
      );
      results.push({
        record,
        command,
        rank,
        flagRank,
        depth: commandTokens.length,
      });
    }
    results.sort(
      (a, b) =>
        a.rank - b.rank ||
        a.flagRank - b.flagRank ||
        (!commandQuery.length && !queryFlags.length
          ? a.depth - b.depth ||
            (commonOrder.get(a.command) ?? 1000) -
              (commonOrder.get(b.command) ?? 1000)
          : 0) ||
        a.depth - b.depth ||
        lexical(a.command, b.command),
    );
    return results.map((result) => result.record);
  }

  global.OFICINA_COMMAND_SEARCH = Object.freeze({ search });
})(typeof window !== "undefined" ? window : globalThis);
