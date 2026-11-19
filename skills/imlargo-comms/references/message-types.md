---
name: message-types
description: "How imlargo writes each common workplace message: status updates, questions, requests, follow-ups, saying no, pushback and disagreement, delays and bad news, incidents, feedback, thanks, introductions and handoffs, with examples. Load when drafting one of these messages."
---

# Message Types

Examples show the shape, not slots to fill. Adapt them to the facts.

## Status Update

State, change, next, needs. "Search is on track for Friday. Filters are done and merged; pagination is in review. Next: the empty states. I need the final copy for them from @marta by Wednesday."

## Question

Say what you're trying to do, what you tried or found, and the exact question. Make it answerable in one line.

"I'm wiring the invoice export. The API returns amounts in cents, but the old report shows them with tax included. Should the export include tax? [link to the report]"

## Request

What, why it matters, by when. Make it easy to say yes, and fine to say no.

"Could you review #412 by Thursday? It's the migration the release depends on. ~200 lines, mostly the new query. If you can't this week, tell me and I'll ask Andrés."

## Follow-Up

Restate the ask in full, with a reason or a new deadline. Never "just following up" or "bumping this".

"Checking on the access request for the staging database: without it I can't test the migration before Thursday's release. Can someone with admin rights approve it today?"

## Saying No

Answer first, the reason in one line, then what you can offer. No long justification.

"I can't take this sprint: I'm on the billing migration until the 20th. I can pair with whoever takes it for an hour tomorrow, or pick it up after the 20th."

## Pushback and Disagreement

Agree on the goal, state the concern with evidence, propose an alternative, and leave the decision with whoever owns it.

"I agree we need the dashboard for the demo. Building it on the old API means redoing it in two weeks: that API is removed in v3. I'd build it on v3 behind a flag; it's one more day. Your call, Ana."

## Delays and Bad News

First line is the news. Then the cause in one line, the new date and how sure you are, and what you're doing to avoid it again if relevant.

"The import won't be ready Friday. The provider's API paginates differently than its docs say, and I found it today. New estimate: Wednesday, once their support confirms the format. I'll update you tomorrow either way."

## Incidents

Impact, current state, next update time. Facts only; the cause and blame-free review come after it's resolved.

"Payments are failing for about 30% of checkouts since 10:40. We've rolled back the 10:30 deploy and are watching the error rate. Next update at 11:30 or sooner if it changes."

## Feedback

Private for anything critical. Specific behavior, its effect, what you'd suggest. About the work, never the person.

"On #388: the retry loop has no limit, so a down provider would block the worker forever. I'd cap it at 3 with backoff. The rest reads clearly, especially the error types."

## Thanks

Name what the person did and its effect. One or two lines.

"Thanks for staying on the call to debug the webhook, Carlos. Without the log you found we'd still be guessing."

## Introductions

Why the two people should talk, one line about each, and who reaches out first. Ask before introducing someone outside the company.

## Handoffs

What the work is, its state, where everything lives (links), what's pending and its risks, and who to ask. The receiver should be able to continue without a call.
