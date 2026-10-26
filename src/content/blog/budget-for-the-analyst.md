---
title: "Budget for the Analyst. Unless You Enjoy Paying to Build Things Twice."
description: "AI can accelerate development. It cannot replace the human work of figuring out what your organization needs, getting people to agree, and proving the finished product delivers."
status: published
topics:
  - technology-decisions
  - custom-development
  - ai-automation
author: VortiQuest
publishedAt: 2026-09-11
---

Somewhere, a manager is looking at a project budget and asking a question that sounds financially responsible: “If the developer uses AI, why are we paying for a business analyst?” An understandable question. The developer can generate code faster now. Surely they can also interview six departments, reconcile conflicting policies, facilitate difficult meetings, uncover unofficial workflows, negotiate competing priorities, and determine whether the finished application solves the problem. Perhaps they can cater the launch, too. We should check their availability.

This is how organizations confuse faster construction with a reduced need to understand what they are constructing. AI can help a developer produce software. It can also support requirements analysis and testing. But someone still has to investigate the business, get decisions from the right people, and distinguish an actual requirement from a senior manager’s personal preference delivered at executive volume.

**That work needs a qualified person, allocated time, and a budget.** On projects involving multiple stakeholders, significant process changes, or consequential business rules, paying for business analysis is part of paying for a usable result. Removing the analyst does not remove the work. It usually hands it to an already busy developer, leaves it to an unprepared project sponsor, or postpones it until the organization discovers what went wrong.

## You Are Paying for the Conversations That Prevent the Wrong Application

“We need a request management system” sounds like something a developer could start building immediately. It is also something six departments can say while imagining six entirely different products. Operations wants assignments. Finance wants spending controls. Leadership wants reporting. Employees want fewer forms. One department head wants ownership of the entire process because apparently the existing territory was insufficient.

A business analyst brings those people together and works through what they mean. What problem are we solving? Who owns the request? Who can change it? Which approvals are necessary? What happens when departments disagree? What does “complete” mean, and who gets to decide?

These conversations take preparation, facilitation, and follow-up. Someone has to identify the participants, ask useful questions, keep the discussion focused, document decisions, and pursue the unresolved items after everyone returns to their inbox. A meeting invitation alone does not accomplish any of that. Neither does a transcript. You can record ninety minutes of confusion with perfect accuracy and still have ninety minutes of confusion.

The analyst’s value is in moving that conversation toward an agreed understanding that people can act on. AI can summarize what was said. A skilled facilitator has to notice what was avoided, whose perspective was missing, and whether the apparent agreement will survive contact with Monday morning.

## The Politics Are Already in the Requirements

Organizational politics do not politely wait outside the project room. They arrive early, select a chair near the sponsor, and announce that their preferred feature is “critical to the mission.”

A request for a mandatory approval step may reflect a legitimate control. It may also reflect a manager’s reluctance to delegate. A demand for a separate dashboard may serve a distinct operational need—or someone’s determination never to use the same report as another department. Resistance to an integration may involve security concerns, poor data quality, fear of losing control, or concern that the new system will expose years of questionable reporting.

An analyst should not assume bad motives. They need enough curiosity and independence to investigate the concern, understand its consequences, and bring the underlying decision to the appropriate owner. That takes human interaction, trust, and tact. Occasionally, it also takes asking the same question three different ways until someone gives an answer that contains information.

AI can help analyze documented positions. It cannot independently verify the motives behind them or establish whose interpretation should govern the organization. And developers are not automatically equipped for that work simply because they understand software. Technical skill does not come bundled with facilitation, conflict resolution, and an intimate understanding of why two directors have communicated exclusively through copied emails since 2019.

Some developers are excellent analysts. Some analysts are capable developers. The distinction is the work and the skills required, rather than a rigid boundary between job titles. But if your developer is doing discovery, facilitating decisions, and validating requirements, you are using analyst capacity. Budget for it instead of pretending it happens free between commits.

## A Paid Analyst Has Time to Investigate What Everyone Else Assumes

Organizations often try to cover analysis by assigning someone who “knows the process” to help when available. That person still has a full-time job. They answer questions between deadlines, miss workshops because operations come first, and eventually approve a document they had eleven minutes to review. The project later records this as “business validation.” A triumph of administrative optimism.

A funded analyst has allocated time to investigate. They can interview the people doing the work, compare the official process with actual practice, identify exceptions, and follow up when the answers conflict. They can discover that the procedure says “send to the manager,” while the functioning process depends on Denise checking three spreadsheets and remembering which manager currently has authority.

That knowledge has to become explicit before development can reliably support it. Otherwise, the team builds the official process, launches it, and discovers that Denise has been operating an undocumented integration platform using Excel and personal endurance.

Paying for analysis buys the capacity to uncover those dependencies while there is still time to address them. It also gives the project a person responsible for keeping requirements clear as new information emerges. Paying someone with an analyst title is insufficient on its own; they need access to stakeholders, support from the sponsor, and the ability to raise unresolved issues.

## Let the Developer Develop—With Clear Decisions to Work From

A developer using AI can move quickly when the business rules are understood. They can explore implementation options, build prototypes, connect systems, and automate useful checks. That speed loses value when they must repeatedly stop to settle questions the organization has avoided.

“Managers can see their team’s records” is a perfect example. Which managers? Temporary supervisors? Project leads? Can they see historical records? What happens when an employee supports two departments? Who can view confidential cases? These decisions affect permissions, data structures, screens, exports, and tests. They cannot safely be settled by whichever interpretation makes the code easiest to write.

The analyst works with stakeholders to resolve the business questions; the developer helps explain technical implications and practical options. Both contribute throughout the project. A prototype may expose a requirement nobody considered. A technical constraint may require the business to choose a different approach. Good collaboration makes those discoveries useful.

What fails is expecting the developer to become the organization’s unofficial policy authority while also delivering faster because “AI does most of it now.” That arrangement gives one person competing responsibilities, limited authority, and an impressive collection of future blame.

## Testing Starts With Knowing What Must Be True

The analyst’s role also extends to making requirements testable. “The workflow works” is too vague to guide acceptance. A successful demonstration shows that the demonstrated scenario succeeded. It does not establish that unauthorized people cannot approve requests, that changes invalidate earlier approvals when required, or that records remain accessible to the correct people after a transfer.

For a requirement such as “requests above the spending threshold require an authorized manager’s approval,” someone must confirm the threshold, the authorized roles, the exceptions, and the behavior when a request changes. Those decisions should connect to acceptance criteria and test scenarios. The project also needs suitable test data, access to the relevant roles, business users available to participate, and a clear way to record the results.

AI can generate tests from those requirements. But if the requirements allow employees to approve their own reimbursements, generated tests may diligently confirm that employees can approve their own reimbursements. Everything passes. Accounting begins quietly updating its résumé.

Analysts help maintain the connection between the business need, the agreed requirement, and the evidence used to accept the result. Developers and testers provide implementation and testing expertise; business owners confirm operational suitability. That coordination takes time. It belongs in the budget just as surely as development does.

## Cutting the Analyst Moves the Cost Somewhere Else

There are small, contained changes where a separate analyst would be unnecessary. An experienced developer and an available business owner may be entirely sufficient. The case for dedicated analysis grows with the number of stakeholders, uncertainty, process change, and consequences of getting the rules wrong.

For those projects, skipping paid analysis can shift the cost into repeated development, unresolved decisions, missed requirements, and poor adoption. Employees build workarounds. Departments dispute reports. Permissions need redesigning. Leadership wonders why the application technically works but nobody trusts it.

The analyst’s fee was visible in the proposal. The hours employees spend repairing the consequences are scattered across calendars, support tickets, and late afternoons. Apparently, a cost becomes more acceptable once it is difficult to count.

A competent analyst should produce useful decisions, clear requirements, and verifiable outcomes. They should challenge unnecessary complexity and avoid turning discovery into an endless festival of workshops. Their job is to help the project advance with fewer unsupported assumptions—not to establish permanent residency in the conference room.

## Faster Software Needs Better Business Understanding

AI gives organizations an opportunity to spend less effort on parts of implementation and more attention on whether the result serves the business. A qualified analyst helps make that opportunity real through investigation, facilitation, process design, requirements validation, and acceptance planning.

They ask the question nobody answered. They bring in the employee everyone forgot. They help separate a business control from a territorial demand. They make sure agreement means something more than a room full of people wanting the meeting to end.

Budget for that work. Give it a capable owner, stakeholder access, and sponsor support. Then give the developer clear decisions and room to build.

Otherwise, AI may help you deliver a polished application at remarkable speed, only for employees to keep the real operation running in a secret spreadsheet. The analyst looked expensive. Now you are paying for the application, the spreadsheet, and the meetings about why neither matches the dashboard.
