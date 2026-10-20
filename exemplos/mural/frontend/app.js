(() => {
  const $ = (id) => document.getElementById(id);
  const form = $("message-form");
  let loading = false;
  function say(message, error = false) {
    $("feedback").textContent = message;
    $("feedback").classList.toggle("error", error);
  }
  async function request(path, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(path, {
        ...options,
        signal: controller.signal,
      });
      if (response.status === 204) return null;
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error(
          "A API não respondeu em JSON. Confira os containers e os logs.",
        );
      }
      if (!response.ok)
        throw new Error(
          data.error || "A API não conseguiu atender a requisição.",
        );
      return data;
    } catch (error) {
      if (error.name === "AbortError")
        throw new Error(
          "A API demorou para responder. Confira os containers e tente novamente.",
        );
      if (error instanceof TypeError)
        throw new Error(
          "Não foi possível alcançar a API. Confira a conexão e tente atualizar.",
        );
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
  function render(messages) {
    const list = $("messages");
    list.replaceChildren();
    if (!messages.length) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent =
        "O mural está vazio. Publique o primeiro recado da turma.";
      list.append(empty);
      return;
    }
    messages.forEach((message) => {
      const article = document.createElement("article");
      article.className = "message";
      const meta = document.createElement("div");
      meta.className = "message-meta";
      const author = document.createElement("strong");
      author.textContent = message.author;
      const date = document.createElement("time");
      date.dateTime = message.created_at;
      date.textContent = new Date(message.created_at).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      meta.append(author, date);
      const text = document.createElement("p");
      text.textContent = message.text;
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "delete";
      remove.textContent = "Excluir recado";
      remove.setAttribute("aria-label", "Excluir recado de " + message.author);
      remove.addEventListener("click", async () => {
        remove.disabled = true;
        try {
          await request("/api/messages/" + message.id, { method: "DELETE" });
          article.remove();
          say("Recado excluído.");
          await load();
        } catch (error) {
          say(error.message, true);
        } finally {
          remove.disabled = false;
        }
      });
      article.append(meta, text, remove);
      list.append(article);
    });
  }
  async function load() {
    if (loading) return;
    loading = true;
    $("refresh").disabled = true;
    $("list-feedback").textContent = "Atualizando…";
    $("list-feedback").classList.remove("error");
    try {
      const data = await request("/api/messages");
      render(data.messages);
      $("list-feedback").textContent = data.messages.length
        ? data.messages.length + " recado(s) mais recente(s)"
        : "";
      $("status").textContent = "Conectado ao PostgreSQL";
      $("status").className = "connection online";
    } catch (error) {
      $("list-feedback").textContent = error.message;
      $("list-feedback").classList.add("error");
      $("status").textContent = "Conexão indisponível";
      $("status").className = "connection error";
    } finally {
      loading = false;
      $("refresh").disabled = false;
    }
  }
  $("text").addEventListener("input", () => {
    $("counter").textContent = Array.from($("text").value).length + " / 280";
  });
  $("refresh").addEventListener("click", load);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const author = $("author").value.trim(),
      text = $("text").value.trim();
    if (!author || !text) {
      say("Preencha o nome e o recado.", true);
      return;
    }
    $("submit").disabled = true;
    $("submit").textContent = "Publicando…";
    say("");
    try {
      await request("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, text }),
      });
      $("text").value = "";
      $("counter").textContent = "0 / 280";
      say("Recado salvo no banco.");
      await load();
      $("text").focus();
    } catch (error) {
      say(error.message, true);
    } finally {
      $("submit").disabled = false;
      $("submit").textContent = "Publicar recado";
    }
  });
  request("/api/info")
    .then((info) => {
      $("instance").textContent =
        "API " + info.version + " · container " + info.hostname;
    })
    .catch(() => {
      $("instance").textContent = "Instância ainda indisponível";
    });
  load();
})();
