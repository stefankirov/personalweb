import { initRevealAnimations } from '../utils.js';

export const title = 'Stefan Kirov — Independent Engineering Consultant';

export function render() {
  return `
<!-- HERO -->
<section class="hero" id="home">
  <div class="hero-left">
    <div class="hero-icon">
      <!--
        Agentic AI graph — three tiers:
          1. Orchestrator (left solid dot) — the main agent
          2. Reasoning loop (center ellipse) — think / plan / observe cycle
          3. Tools & models (right) — what the agent calls out to

        Leaf node shapes:
          ●  filled circle  = LLM model
          ◆  diamond        = external tool (search, code exec, etc.)
          ○  outlined circle = API / data source

        Animation: paths draw L→R, then two dots orbit the loop
        continuously while branch dots fire as tool calls and return
        dots carry results back — representing the full agent loop.
      -->
      <svg width="100%" viewBox="0 0 320 96" fill="none" xmlns="http://www.w3.org/2000/svg">

        <!-- Orchestrator pulse ring (radiates outward after everything draws) -->
        <circle class="ai-pulse" cx="22" cy="48" r="10" stroke="#C0512F" stroke-width="1.5" fill="none"/>

        <!-- ── 1. Entry: orchestrator → loop ── -->
        <path id="p-entry" class="ai-path-entry"
              d="M 22 48 L 78 48"
              stroke="#C0512F" stroke-width="1.5" stroke-opacity="0.5"/>

        <!-- ── 2. Reasoning loop (full ellipse, center 130,48 rx=52 ry=30) ──
              Sweeps counterclockwise: left → TOP → right → BOTTOM → left
              so the animateMotion dot visually goes up first, then down.    -->
        <path id="p-loop" class="ai-path-loop"
              d="M 78 48 A 52 30 0 0 0 182 48 A 52 30 0 0 0 78 48"
              stroke="#C0512F" stroke-width="1.5" stroke-opacity="0.4"/>

        <!-- ── 3. Branch paths: dispatch node → tools ── -->
        <path id="p-t1" class="ai-path-t1"
              d="M 182 48 C 218 48 248 22 282 18"
              stroke="#C0512F" stroke-width="1" stroke-opacity="0.32"/>
        <path id="p-t2" class="ai-path-t2"
              d="M 182 48 L 296 48"
              stroke="#C0512F" stroke-width="1" stroke-opacity="0.32"/>
        <path id="p-t3" class="ai-path-t3"
              d="M 182 48 C 218 48 248 74 282 78"
              stroke="#C0512F" stroke-width="1" stroke-opacity="0.32"/>

        <!-- ── Return paths: results flow back into loop (dashed, fade in) ── -->
        <path id="p-ret1"
              class="ai-path-ret"
              d="M 282 18 C 258 6 148 4 78 36"
              stroke="#C0512F" stroke-width="1" stroke-opacity="0.22"/>
        <path id="p-ret3"
              class="ai-path-ret"
              d="M 282 78 C 258 90 148 92 78 60"
              stroke="#C0512F" stroke-width="1" stroke-opacity="0.22"/>

        <!-- ── Traveling dots ── -->

        <!-- Loop: primary dot orbiting (starts after loop draws: 0.85+1.0=1.85s) -->
        <circle r="2.5" fill="#C0512F">
          <animateMotion dur="2.4s" begin="2.1s" repeatCount="indefinite">
            <mpath href="#p-loop"/>
          </animateMotion>
        </circle>
        <!-- Loop: echo dot, half period behind -->
        <circle r="1.8" fill="#C0512F" fill-opacity="0.38">
          <animateMotion dur="2.4s" begin="3.3s" repeatCount="indefinite">
            <mpath href="#p-loop"/>
          </animateMotion>
        </circle>

        <!-- Entry: pulse entering the loop -->
        <circle r="2" fill="#C0512F">
          <animateMotion dur="0.48s" begin="2.0s" repeatCount="indefinite">
            <mpath href="#p-entry"/>
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.48s" begin="2.0s" repeatCount="indefinite"/>
        </circle>

        <!-- Tool call: → T1 (model) -->
        <circle r="1.8" fill="#C0512F">
          <animateMotion dur="0.85s" begin="3.0s" repeatCount="indefinite">
            <mpath href="#p-t1"/>
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.85s" begin="3.0s" repeatCount="indefinite"/>
        </circle>
        <!-- Tool call: → T2 (tool) -->
        <circle r="1.8" fill="#C0512F">
          <animateMotion dur="0.72s" begin="3.8s" repeatCount="indefinite">
            <mpath href="#p-t2"/>
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.72s" begin="3.8s" repeatCount="indefinite"/>
        </circle>
        <!-- Tool call: → T3 (api) -->
        <circle r="1.8" fill="#C0512F">
          <animateMotion dur="0.85s" begin="4.6s" repeatCount="indefinite">
            <mpath href="#p-t3"/>
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="0.85s" begin="4.6s" repeatCount="indefinite"/>
        </circle>

        <!-- Return: result from T1 back into loop top -->
        <circle r="1.6" fill="#C0512F" fill-opacity="0.55">
          <animateMotion dur="0.85s" begin="3.35s" repeatCount="indefinite">
            <mpath href="#p-ret1"/>
          </animateMotion>
          <animate attributeName="opacity" values="0;0.6;0.6;0" keyTimes="0;0.08;0.92;1" dur="0.85s" begin="3.35s" repeatCount="indefinite"/>
        </circle>
        <!-- Return: result from T3 back into loop bottom -->
        <circle r="1.6" fill="#C0512F" fill-opacity="0.55">
          <animateMotion dur="0.85s" begin="4.95s" repeatCount="indefinite">
            <mpath href="#p-ret3"/>
          </animateMotion>
          <animate attributeName="opacity" values="0;0.6;0.6;0" keyTimes="0;0.08;0.92;1" dur="0.85s" begin="4.95s" repeatCount="indefinite"/>
        </circle>

        <!-- ── Dispatch node at loop exit (fades in after loop draws) ── -->
        <circle class="ai-node ai-node-agent" cx="182" cy="48" r="4" fill="#C0512F" fill-opacity="0.75"/>

        <!-- ── Leaf nodes (right side) ── -->
        <!-- ● LLM model (top) -->
        <circle  class="ai-node ai-node-leaf" cx="282" cy="18" r="4.5" fill="#C0512F"/>
        <!-- ◆ External tool / code exec (middle, diamond) -->
        <polygon class="ai-node ai-node-leaf" points="296,42 304,48 296,54 288,48" fill="#C0512F" fill-opacity="0.65"/>
        <!-- ○ API / data source (bottom) -->
        <circle  class="ai-node ai-node-leaf" cx="282" cy="78" r="4.5" fill="none" stroke="#C0512F" stroke-width="1.5" stroke-opacity="0.8"/>

        <!-- ── Orchestrator (always visible, renders on top of pulse ring) ── -->
        <circle cx="22" cy="48" r="8" fill="#C0512F"/>

      </svg>
    </div>
    <h1>Senior Engineering<br><em>Consultant</em><br>&amp; Team Lead</h1>
    <p class="hero-desc">I partner with product teams and founders to architect scalable backend systems, lead delivery, and build cloud-native platforms that grow with your business. 13+ years of distributed systems expertise — now expanding into Agentic AI and MCP tooling.</p>
    <div class="hero-ctas">
      <a href="/#contact" class="btn-primary" data-link>Start a Conversation ↓</a>
      <a href="/#offer" class="btn-secondary" data-link>What I Offer</a>
    </div>
  </div>
  <div class="hero-visual">
    <div class="hero-card">
      <p class="hero-card-label">What I bring to your table</p>
      <div class="stat-row">
        <div class="stat-item">
          <span class="stat-num">13+</span>
          <span class="stat-label">Yrs. Exp.</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">M+</span>
          <span class="stat-label">Users Scaled</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">5</span>
          <span class="stat-label">Industries</span>
        </div>
      </div>
      <div class="tech-chips">
        <span class="chip">Azure</span>
        <span class="chip">C# / .NET</span>
        <span class="chip">Node.js</span>
        <span class="chip">TypeScript</span>
        <span class="chip">Python</span>
        <span class="chip">Microservices</span>
        <span class="chip">Docker</span>
        <span class="chip">Scrum / SAFe</span>
        <span class="chip hot">Agentic AI</span>
        <span class="chip hot">MCP</span>
      </div>
    </div>
  </div>
</section>

<!-- WHAT I OFFER -->
<section id="offer">
  <h2 class="section-title">What I Can Do For You</h2>
  <div class="offer-grid">
    <div class="offer-block reveal">
      <div class="offer-icon">⬡</div>
      <p class="offer-title">System Architecture</p>
      <p class="offer-desc">Design and review of distributed microservices platforms — from greenfield architecture to legacy modernisation. I'll make sure your system scales before it has to.</p>
    </div>
    <div class="offer-block reveal">
      <div class="offer-icon">☁</div>
      <p class="offer-title">Cloud-Native Delivery</p>
      <p class="offer-desc">End-to-end Azure cloud infrastructure — App Services, Container Apps, Functions, API Management, Cosmos DB — designed production-ready from day one.</p>
    </div>
    <div class="offer-block reveal">
      <div class="offer-icon">⚡</div>
      <p class="offer-title">High-Throughput APIs</p>
      <p class="offer-desc">Engineering performant REST APIs and third-party integrations built to hold up under real load. I've shipped systems serving millions of concurrent users.</p>
    </div>
    <div class="offer-block reveal">
      <div class="offer-icon">▲</div>
      <p class="offer-title">Team Lead &amp; Scrum Delivery</p>
      <p class="offer-desc">I can embed as a hands-on tech lead or run your full Scrum cycle — sprint planning, backlog refinement, standups, retrospectives, and stakeholder reporting — while still writing code.</p>
    </div>
    <div class="offer-block reveal">
      <div class="offer-icon">◎</div>
      <p class="offer-title">Observability &amp; SRE</p>
      <p class="offer-desc">Building reliability into your platform through Grafana dashboards, Loki log aggregation, alerting pipelines, and runbooks that actually reduce incidents.</p>
    </div>
    <div class="offer-block reveal">
      <div class="offer-icon">✦</div>
      <p class="offer-title">Agentic AI &amp; MCP</p>
      <p class="offer-desc">Helping teams design and integrate agentic AI systems — LLM-powered backends, Model Context Protocol (MCP) server architecture, tool-use orchestration, and AI workflow automation.</p>
    </div>
  </div>
</section>

<!-- HOW I WORK -->
<section id="process">
  <h2 class="section-title">How I Work</h2>
  <div class="process-steps">
    <div class="process-step reveal">
      <p class="process-step-title">Discovery &amp; Scoping</p>
      <p class="process-step-desc">We start with a focused session to understand your system, your team, and the problems you're actually trying to solve — not just the ones on the surface.</p>
    </div>
    <div class="process-step reveal">
      <p class="process-step-title">Architecture &amp; Planning</p>
      <p class="process-step-desc">I produce clear architecture proposals, technical roadmaps, and delivery plans with realistic scope. No hand-wavy diagrams — decisions you can build on immediately.</p>
    </div>
    <div class="process-step reveal">
      <p class="process-step-title">Embedded Delivery</p>
      <p class="process-step-desc">I join your team in-sprint, write production code, run Scrum ceremonies, and mentor engineers as we ship together. Async-first, remote-comfortable, across time zones.</p>
    </div>
    <div class="process-step reveal">
      <p class="process-step-title">Handoff &amp; Continuity</p>
      <p class="process-step-desc">Every engagement ends with thorough documentation, knowledge transfer, and a system your team owns confidently — not a black box only I can maintain.</p>
    </div>
  </div>
</section>

<!-- PROJECTS -->
<section id="projects">
  <h2 class="section-title">Selected Projects</h2>

  <div class="meridian-intro reveal">
    <div>
      <div class="meridian-live">Live</div>
      <h3 class="meridian-name">Meridian Gateway</h3>
      <p class="meridian-tagline">AI infrastructure for engineering teams</p>
      <p class="meridian-desc">Meridian sits between your teams and the AI models they use — giving you control over who can access AI, what they can spend, and what happens when something goes wrong. Built for organisations where AI is becoming critical infrastructure, not just an experiment.</p>
      <div class="meridian-chips">
        <span class="chip">TypeScript</span>
        <span class="chip">Fastify 5</span>
        <span class="chip">PostgreSQL</span>
        <span class="chip">Redis</span>
        <span class="chip">Next.js 15</span>
        <span class="chip">Docker</span>
        <span class="chip hot">OpenAI</span>
        <span class="chip hot">Anthropic</span>
      </div>
      <div class="meridian-links">
        <a href="/projects/meridian-gateway" class="btn-secondary" data-link>View case study →</a>
        <a href="/#contact" class="meridian-link" data-link>Discuss this project →</a>
      </div>
    </div>

    <div class="meridian-dashboard">
      <div class="dash-topbar">
        <span class="dash-topbar-title">Admin Dashboard · last 30 days</span>
        <div class="dash-pills">
          <span class="dash-pill">7d</span>
          <span class="dash-pill active">30d</span>
          <span class="dash-pill">90d</span>
        </div>
      </div>
      <div class="dash-metrics">
        <div class="dash-metric">
          <span class="dash-metric-label">Total Requests</span>
          <span class="dash-metric-val">2,015</span>
          <span class="dash-metric-sub">last 30 days</span>
        </div>
        <div class="dash-metric">
          <span class="dash-metric-label">Total Cost</span>
          <span class="dash-metric-val">$47.97</span>
          <span class="dash-metric-sub">last 30 days</span>
        </div>
        <div class="dash-metric">
          <span class="dash-metric-label">Cache Hit Rate</span>
          <span class="dash-metric-val">25.5%</span>
          <span class="dash-metric-sub">saving $12.21 / 30d</span>
        </div>
        <div class="dash-metric">
          <span class="dash-metric-label">Active Tenants</span>
          <span class="dash-metric-val">6</span>
          <span class="dash-metric-sub">All within budget</span>
        </div>
      </div>
      <div class="dash-lower">
        <div class="dash-log">
          <p class="dash-log-title">Recent Requests</p>
          <div class="dash-log-row">
            <span class="dash-log-tenant">Acme Corp <span style="font-weight:300;color:var(--warm-mid)">· Claude Opus 4</span></span>
            <span class="dash-provider-badge">anthropic</span>
            <span class="dash-miss">MISS</span>
            <span class="dash-ok">200</span>
          </div>
          <div class="dash-log-row">
            <span class="dash-log-tenant">Gamma AI <span style="font-weight:300;color:var(--warm-mid)">· Claude Opus 4</span></span>
            <span class="dash-provider-badge">anthropic</span>
            <span class="dash-miss">MISS</span>
            <span class="dash-ok">200</span>
          </div>
          <div class="dash-log-row">
            <span class="dash-log-tenant">Beta Labs <span style="font-weight:300;color:var(--warm-mid)">· Claude Haiku 3.5</span></span>
            <span class="dash-provider-badge">anthropic</span>
            <span class="dash-hit">HIT</span>
            <span class="dash-ok">200</span>
          </div>
          <div class="dash-log-row">
            <span class="dash-log-tenant">Acme Corp <span style="font-weight:300;color:var(--warm-mid)">· GPT-4o</span></span>
            <span class="dash-provider-badge openai">openai</span>
            <span class="dash-miss">MISS</span>
            <span class="dash-ok">200</span>
          </div>
        </div>
        <div class="dash-health">
          <p class="dash-health-title">Provider Health</p>
          <div class="dash-provider-row">
            <span class="dash-provider-name"><span class="dash-dot"></span>OpenAI</span>
            <span class="dash-closed">Healthy</span>
          </div>
          <div class="dash-provider-row">
            <span class="dash-provider-name"><span class="dash-dot"></span>Anthropic</span>
            <span class="dash-closed">Healthy</span>
          </div>
          <div class="dash-gateway-status"><span class="dash-dot"></span>Gateway operational · v1.0.0</div>
        </div>
      </div>
    </div>
  </div>

  <div class="meridian-feat-grid">
    <div class="meridian-feat reveal">
      <div class="meridian-feat-icon">⬡</div>
      <p class="meridian-feat-title">Zero Disruption</p>
      <p class="meridian-feat-desc">Change one URL. Any app already calling OpenAI works immediately — no new SDKs, no code changes, no migration project.</p>
    </div>
    <div class="meridian-feat reveal">
      <div class="meridian-feat-icon">◈</div>
      <p class="meridian-feat-title">Per-Team Budgets</p>
      <p class="meridian-feat-desc">Each team gets a monthly spend limit. Alerts at threshold, clean rejection at cap — no more surprise invoices from a runaway integration.</p>
    </div>
    <div class="meridian-feat reveal">
      <div class="meridian-feat-icon">↻</div>
      <p class="meridian-feat-title">Automatic Failover</p>
      <p class="meridian-feat-desc">Meridian watches provider health continuously. When OpenAI has an outage, traffic routes to Anthropic automatically — no human intervention needed.</p>
    </div>
    <div class="meridian-feat reveal">
      <div class="meridian-feat-icon">◎</div>
      <p class="meridian-feat-title">Isolated API Keys</p>
      <p class="meridian-feat-desc">Every team gets its own key, revocable in seconds. One compromised credential affects nothing else. Provider keys never leave the gateway.</p>
    </div>
    <div class="meridian-feat reveal">
      <div class="meridian-feat-icon">⚡</div>
      <p class="meridian-feat-title">Smart Caching</p>
      <p class="meridian-feat-desc">Exact and semantic caching returns repeated answers in under 30ms with no provider call. Typical teams save 20–40% on AI spend through caching alone.</p>
    </div>
    <div class="meridian-feat reveal">
      <div class="meridian-feat-icon">▤</div>
      <p class="meridian-feat-title">Full Audit Log</p>
      <p class="meridian-feat-desc">Every request recorded: team, model, cost, latency, cache result. Queryable by tenant and date range — ready for compliance reviews and finance attribution.</p>
    </div>
  </div>

  <div class="meridian-perf reveal">
    <div class="meridian-perf-stat">
      <span class="meridian-perf-val">&lt; 50ms</span>
      <span class="meridian-perf-label">Added latency</span>
    </div>
    <div class="meridian-perf-stat">
      <span class="meridian-perf-val">&lt; 30ms</span>
      <span class="meridian-perf-label">Cached responses</span>
    </div>
    <div class="meridian-perf-stat">
      <span class="meridian-perf-val">20–40%</span>
      <span class="meridian-perf-label">Typical cost reduction</span>
    </div>
    <div class="meridian-perf-stat">
      <span class="meridian-perf-val">99.9%</span>
      <span class="meridian-perf-label">Availability target</span>
    </div>
    <div class="meridian-perf-stat">
      <span class="meridian-perf-val">&lt; 2 hrs</span>
      <span class="meridian-perf-label">Time to deploy</span>
    </div>
  </div>
</section>

<!-- TECH STACK -->
<section id="stack">
  <h2 class="section-title">Technologies &amp; Tools</h2>
  <div class="stack-groups">
    <div class="stack-group reveal">
      <p class="stack-group-label">Languages</p>
      <div class="stack-items">
        <span class="stack-tag">C#</span>
        <span class="stack-tag">.NET / ASP.NET</span>
        <span class="stack-tag">Node.js</span>
        <span class="stack-tag">TypeScript</span>
        <span class="stack-tag">JavaScript</span>
        <span class="stack-tag">Python</span>
      </div>
    </div>
    <div class="stack-group reveal">
      <p class="stack-group-label">Cloud &amp; Infrastructure</p>
      <div class="stack-items">
        <span class="stack-tag">Azure App Services</span>
        <span class="stack-tag">Azure Functions</span>
        <span class="stack-tag">Container Apps</span>
        <span class="stack-tag">API Management</span>
        <span class="stack-tag">Cosmos DB</span>
      </div>
    </div>
    <div class="stack-group reveal">
      <p class="stack-group-label">Data</p>
      <div class="stack-items">
        <span class="stack-tag">MongoDB</span>
        <span class="stack-tag">SQL Server</span>
        <span class="stack-tag">Redis</span>
      </div>
    </div>
    <div class="stack-group reveal">
      <p class="stack-group-label">DevOps &amp; Observability</p>
      <div class="stack-items">
        <span class="stack-tag">Docker</span>
        <span class="stack-tag">GitHub Actions</span>
        <span class="stack-tag">CI/CD</span>
        <span class="stack-tag">Grafana</span>
        <span class="stack-tag">Loki</span>
      </div>
    </div>
    <div class="stack-group reveal">
      <p class="stack-group-label">Architecture &amp; Delivery</p>
      <div class="stack-items">
        <span class="stack-tag">Microservices</span>
        <span class="stack-tag">REST APIs</span>
        <span class="stack-tag">Event-Driven Design</span>
        <span class="stack-tag">Scrum</span>
        <span class="stack-tag">SAFe Agile</span>
      </div>
    </div>
    <div class="stack-group reveal">
      <p class="stack-group-label">Agentic AI</p>
      <div class="stack-items">
        <span class="stack-tag emerging">MCP (Model Context Protocol)</span>
        <span class="stack-tag emerging">Agentic Systems</span>
        <span class="stack-tag emerging">LLM Integration</span>
        <span class="stack-tag emerging">AI Tool Orchestration</span>
        <span class="stack-tag emerging">AI Workflow Automation</span>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <div class="contact-grid">
    <div class="reveal">
      <h2 class="contact-intro">Ready to work with<br>someone who<br><em>actually ships?</em></h2>
      <p class="contact-blurb">Whether you need an architect to design your next platform, a tech lead to run your delivery, or an engineering partner to help you move faster with AI — I'd love to hear about your project. Based in Las Vegas, NV. Available remotely, worldwide.</p>
    </div>
    <div class="contact-links reveal">
      <a href="https://mailstefankirov.netlify.app/" target="_blank" class="contact-link">
        <span class="contact-link-icon">✉</span>
        <span class="contact-link-info">
          <span class="contact-link-label">Email</span>
          <span class="contact-link-value">contact me</span>
        </span>
      </a>
      <a href="https://linkedin.com/in/stefan-kirov" target="_blank" class="contact-link">
        <span class="contact-link-icon">in</span>
        <span class="contact-link-info">
          <span class="contact-link-label">LinkedIn</span>
          <span class="contact-link-value">linkedin.com/in/stefan-kirov</span>
        </span>
      </a>
    </div>
  </div>
</section>
`;
}

export function mount() {
  initRevealAnimations();
}
