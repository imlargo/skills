---
name: questionnaire
description: "Turning open decisions a client must answer (the diagnosis's open decisions, missing business rules, unknown volumes) into a questionnaire they fill in on their own or in a meeting. Load when imlargo needs answers from a client or someone else to close a diagnosis, specs or a proposal."
---

# Questionnaire

The client holds knowledge imlargo lacks; the questionnaire pulls it out of them. Ask imlargo only about the send, never the subject: who it goes to, and what they need back.

## Steps

1. **Who receives it:** role, how technical they are, relationship to imlargo. This sets the tone and how much context to include.
2. **What imlargo needs back:** the specific decisions or facts to close, usually the open decisions (`D-xx`) of the specs and the "to confirm" list of the diagnosis.
3. **Write it** in the client's language, in business terms, one question per item from step 2.

## Structure

```md
# <Title>

**Para qué es:** la decisión que depende de estas respuestas.
**De:** <imlargo / Kora> · **Para:** <quién> · **Cómo se usan las respuestas:** <dónde terminan>

## Contexto

Un párrafo para alguien que no estuvo en la conversación.

## Cómo responder

Fecha límite y tiempo aproximado. "No sé" y respuestas parciales sirven: márquelas en vez de saltarlas.

## <Tema>

### <Una pregunta, nunca compuesta>

_Por qué importa: solo si la pregunta se puede malinterpretar o invita a una respuesta vaga._

>

## ¿Algo más?

¿Algo que no preguntamos y deberíamos saber?
```

## Rules

- Most important first: an async questionnaire may get only one pass.
- Group by theme once there are more than a handful of questions.
- Every question is one idea, answerable without technical knowledge.
- Never ask what imlargo or the code already knows.

<!--
Source references:
- https://github.com/mattpocock/skills/blob/main/skills/productivity/to-questionnaire/SKILL.md (MIT)
-->
