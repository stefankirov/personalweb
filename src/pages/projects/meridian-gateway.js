import { initRevealAnimations } from '../../utils.js';

export const title = 'Meridian Gateway — Stefan Kirov';

export function render() {
  return `
<div class="project-detail">

  <!-- Back -->
  <div class="project-back-wrap">
    <a href="/#projects" class="project-back" data-link>← All Projects</a>
  </div>

  <!-- Header -->
  <div class="project-header">
    <div class="meridian-live">Live</div>
    <h1 class="project-header-title">Meridian Gateway</h1>
    <p class="project-header-tagline">AI infrastructure for engineering teams</p>
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
    <div class="project-header-links">
      <a href="/#contact" class="btn-primary" data-link>Discuss this project ↓</a>
    </div>
  </div>

  <!-- Full-width dashboard -->
  <div class="project-dashboard-wrap reveal">
    <div class="meridian-dashboard" style="max-width:100%">
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

  <!-- Overview + Stats -->
  <div class="project-overview">
    <div class="project-overview-text reveal">
      <p class="project-overview-label">Overview</p>
      <p>Meridian sits between your teams and the AI models they use — giving you control over who can access AI, what they can spend, and what happens when something goes wrong.</p>
      <p>Built for organisations where AI is becoming critical infrastructure, not just an experiment. Engineering teams shouldn't have to think about which provider is up, whether someone blew the budget, or why a request silently failed at 2am.</p>
      <p>The gateway is a transparent proxy — drop it in front of any OpenAI-compatible client and you get observability, cost controls, and failover with no code changes in the calling app.</p>
    </div>
    <div class="project-overview-sidebar reveal">
      <p class="project-overview-label">At a Glance</p>
      <div class="project-stats-list">
        <div class="project-stat-item">
          <span class="project-stat-val">&lt; 50ms</span>
          <span class="project-stat-label">Added gateway latency</span>
        </div>
        <div class="project-stat-item">
          <span class="project-stat-val">20–40%</span>
          <span class="project-stat-label">Typical cost reduction</span>
        </div>
        <div class="project-stat-item">
          <span class="project-stat-val">99.9%</span>
          <span class="project-stat-label">Availability target</span>
        </div>
        <div class="project-stat-item">
          <span class="project-stat-val">&lt; 2 hrs</span>
          <span class="project-stat-label">Time to first deployment</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Key Features -->
  <div class="project-section">
    <h2 class="project-section-title">Key Features</h2>
    <div class="meridian-feat-grid" style="margin-top:0">
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
  </div>

  <!-- Performance -->
  <div class="project-section project-section--alt">
    <h2 class="project-section-title">Performance</h2>
    <div class="meridian-perf reveal" style="margin-top:0">
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
  </div>

  <!-- Architecture (placeholder) -->
  <div class="project-section">
    <h2 class="project-section-title">Architecture &amp; How It Works</h2>
    <p class="project-placeholder">Architecture details, diagrams, and technical deep-dive coming soon.</p>
  </div>

  <!-- Challenges (placeholder) -->
  <div class="project-section project-section--alt">
    <h2 class="project-section-title">Challenges &amp; Decisions</h2>
    <p class="project-placeholder">Key engineering trade-offs, interesting problems solved, and lessons learned. Semantic caching implementation, multi-tenant key isolation model, automatic failover detection approach.</p>
  </div>

  <!-- CTA -->
  <div class="project-cta-section">
    <p class="project-cta-title">Interested in AI infrastructure<br>for <em>your</em> team?</p>
    <p class="project-cta-sub">Whether you want to deploy Meridian or need something purpose-built for your organisation, I'd love to talk through what the right solution looks like.</p>
    <a href="/#contact" class="btn-primary" data-link>Start a Conversation ↓</a>
  </div>

</div>
`;
}

export function mount() {
  initRevealAnimations();
}
