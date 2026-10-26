---
title: '“I Don’t Care About the Data Engineering. Can AI Build the Thing?”'
description: "AI can build software quickly. Reliable results still require understanding the data, validating outputs, protecting records, and planning for change."
status: published
topics:
  - ai-automation
  - custom-development
  - integrations
  - technology-decisions
author: VortiQuest
publishedAt: 2026-10-22
---

There is a sentence that should make any customer put down their coffee and start asking uncomfortable questions: **“I don’t care about the data engineering. I just want to know if AI can build the thing.”** It sounds practical. Decisive, even. Finally, someone cutting through the technical nonsense and getting things done. Unfortunately, what they may actually be cutting through is the work required to determine whether “the thing” will produce an answer anybody should believe—or survive its first major update.

Can AI build a dashboard? Sure. An application? Absolutely. A reporting tool that confidently displays the wrong numbers in a lovely shade of blue? With breathtaking efficiency. Generating software does not establish that it uses the right information, interprets it correctly, or preserves it when something changes. A developer who dismisses those questions is handing the customer a risk while congratulating themselves on the delivery speed.

And eventually, something will change. A database moves. A field gets renamed. An integration stops working. At that point, “AI built it” becomes a rather inadequate disaster recovery plan.

## A Working Screen Is an Extremely Low Bar

Imagine asking a developer to build a system showing which donors your nonprofit should contact. AI generates the screens, connects a database, and produces a ranked list. Everyone is delighted. Then someone discovers that the system counted pledged donations as money received, treated duplicate records as separate people, and recommended contacting someone who explicitly opted out.

But the buttons work. So, naturally, we’re calling it innovation.

The missing work was understanding the data: what each field means, where it comes from, how current it is, which records belong together, and what rules govern its use. Data engineering helps make information consistently available and usable. Business analysis, data ownership, and validation establish what it should mean and whether it supports the intended decision. Those responsibilities need to be covered, even when one person wears several hats.

Skip that work, and the application may function exactly as written while failing spectacularly at its purpose. The computer followed instructions. Unfortunately, nobody adequately established what the instructions should have been.

## You Cannot Verify “Right” Until You Define It

Before trusting an output, someone needs to establish which source is authoritative, what counts as a valid record, and how the result should be calculated. Does “active customer” mean someone with an open account, a recent purchase, or a current contract? Does revenue include refunds? Does a blank field mean zero, unknown, or “we never collected this”?

These details determine the answer. They are not decorative technical trivia added by people who enjoy scheduling meetings.

AI may infer a plausible interpretation from field names and example records. A plausible interpretation is still an assumption. A column called `total_amount` does not arrive with a sworn affidavit explaining whether it includes taxes, canceled transactions, or adjustments. If the developer cannot explain those distinctions, they cannot adequately demonstrate that the application is correct. They can demonstrate that it runs. Your electric pencil sharpener runs, too. We generally require more evidence before letting one guide organizational decisions.

## The Work You Skip Comes Back Wearing an Invoice

The sales pitch for skipping foundational work is speed. The consequence can be rebuilding the same feature several times as reality arrives, apparently uninvited.

First, the developer builds around one spreadsheet. Then someone identifies the actual system of record. Duplicate records require a different identification method. Historical records use different categories. Departments disagree about definitions. Permissions depend on organizational relationships the original design never considered. Suddenly, the database, import process, calculations, screens, and tests all need changes.

**An early assumption can become a dependency across the entire application.** Correcting it later means finding every place that relied on it.

Rework also reaches beyond code. Staff may need to clean records, repeat testing, reconcile reports, redo training, and correct decisions made from earlier outputs. If inaccurate information was copied elsewhere, fixing the original application does not retrieve every spreadsheet, presentation, or email it contaminated. Congratulations: your shortcut now has distribution channels.

Some discovery during development is inevitable. Pretending foreseeable questions do not matter is a different management strategy, usually financed by the customer.

## Then Someone Says, “Just Have AI Change the Database”

Here is where the attitude becomes particularly expensive. The application needs a new database, a revised structure, or a replacement integration. The person responsible opens an AI agent and types, “Update the application to use the new database and clean up the old stuff.”

What, precisely, is “the old stuff”?

Unused connection settings? Temporary test tables? Historical transactions? Records that look duplicated but represent different people? A field the interface no longer displays but the audit process still depends on? The prompt has supplied a destination and left several consequential decisions open to interpretation.

Depending on its tools and permissions, an agent might only propose changes—or it might execute commands that alter actual records. It could generate a migration that drops a column, recreate a table, overwrite populated fields with empty values, or remove records it interprets as obsolete. Those outcomes are possibilities, not an inevitable consequence of using AI. The danger comes from combining ambiguous instructions, broad access, and inadequate review.

If the person supervising the work cannot recognize a destructive operation, how exactly are they supposed to catch it before approving execution? Admiring the confidence of the explanation is not a review method.

## “We Didn’t Delete Anything” Is Not the Same as “The Data Is Safe”

Data damage can be quieter than an empty database. A migration might preserve every donor and every donation while attaching the donations to the wrong people. It might change identifiers that other systems depend on, strip leading zeros from account numbers, or replace an unknown value with zero. It might mishandle time zones, truncate notes, or turn distinct categories into one convenient but inaccurate label.

Records can survive while their meaning does not.

Relationships matter just as much as individual values. A customer record may connect to invoices, support requests, permissions, and consent history. Deleting or rebuilding that record can break those connections. In some database designs, deleting a parent record can automatically delete related records through cascading rules. In others, an update can leave information disconnected and difficult to reconcile.

That is why understanding keys, relationships, constraints, data types, and migration behavior matters. These concepts explain what a proposed change might affect. They let a developer ask, “What depends on this?” before discovering the answer through an increasingly distressed series of phone calls.

## A Better Prompt Helps. It Does Not Replace Competence.

Yes, unclear prompts can send an agent down an unexpected path. But blaming everything on “the person didn’t prompt it correctly” lets the development process off far too easily. People give incomplete instructions. Tools make mistakes. Responsible systems anticipate both.

A developer should be able to specify what must be preserved, identify assumptions the agent must resolve, and review the proposed changes before execution. Access should match the task. Investigating a reporting issue should not casually require permission to delete production tables.

For a consequential migration, that means testing against an appropriately protected copy or staging environment, inspecting the migration, and checking more than whether it finished without errors. Did the expected records arrive? Do relationships still resolve? Do financial totals reconcile? Were consent settings, permissions, and historical records preserved?

Backups matter, too—but “we have backups” is only reassuring if someone has verified that restoration works and understands what it would recover. Restoring yesterday’s database may also discard legitimate work completed today. Recovery requires planning, including how changes made during the transition will be handled.

**The prompt is one control. It should never be the only thing standing between an ambiguous instruction and a production database.**

## Bad Data Can Look Perfectly Respectable

The most dangerous failure may never produce an error message. The import succeeds. The page loads. The chart looks polished. The numbers are wrong.

A connection between tables might silently exclude people without matching records. Duplicate entries might inflate totals. A synchronization failure might leave yesterday’s information displayed as current. A changed source field might alter a calculation without breaking the application. None of these necessarily announces itself with smoke pouring out of the server.

Validation therefore requires more than asking whether a result “looks reasonable.” Someone needs known examples, independently checked totals, and tests for missing records, duplicates, unusual cases, and stale information. Someone also needs a way to trace a result back to its source and explain what happened to it along the way.

Otherwise, a polished interface makes unreliable information easier to believe. You have made the mistake more persuasive. Terrific achievement.

## The Next Person Needs More Than Your Chat History

Eventually, someone else will maintain this system. They need to know where information comes from, how records connect, which transformations occur, and why particular rules exist. They need a record of database changes and instructions for handling failed imports or migrations.

“The AI knows how it works” is an extraordinary thing to say about an application the organization is expected to depend on. Which conversation? Which version of the code? Which assumptions? Does the next agent have the same context? Has anyone verified that the explanation matches what is actually deployed?

Useful documentation records the system’s current behavior and the reasons behind important decisions. A change log explains what changed. A recovery procedure explains how to respond when the change fails. These protect the customer from inheriting an archaeological excavation with a login screen.

## You Don’t Need a Data Empire. You Do Need Understanding.

None of this means every small application requires a sprawling data platform and six committees. The effort should fit the stakes and complexity. A modest internal tool may need a documented source, clear field definitions, sensible permissions, straightforward validation, and a tested backup process. A system handling donations, payroll, sensitive records, or multiple integrations needs more care.

A prototype using synthetic or approved sample data can also be a useful way to explore whether an idea is feasible. Just be honest about what it proves. Demonstrating a workflow does not establish that the application is ready to manage live organizational records.

AI can help write migrations, map fields, generate tests, and explain dependencies. The person directing that work still needs enough understanding to evaluate the result—or needs qualified help from someone who does. **Using AI changes how the work gets done. It does not eliminate the need to know whether the work is correct.**

## The Customer Deserves More Than “AI Built It”

A trusted developer should welcome questions about where information comes from, how results are verified, and what happens when the system changes. When an answer is unknown, the responsible response is to investigate, explain the limitation, and establish what must happen before the customer relies on the result.

If a developer says, “I don’t care about the data engineering,” ask who will verify the source data, review migrations, protect existing records, and recover the system if an update goes wrong. Ask who will pay for the rework. Listen carefully to whether the answers describe an actual process or simply another opportunity to ask AI to fix whatever AI just did.

The useful question is whether we can build something that uses appropriate data, produces verifiable results, preserves important information, and can be maintained at a cost the organization can support.

Because the customer is trusting you with more than a feature request. They are trusting you with the organization’s history, relationships, and ability to operate. “I just wanted to see if AI could build it” is a remarkably thin explanation for what happened to all three.