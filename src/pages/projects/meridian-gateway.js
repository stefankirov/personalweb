import { initRevealAnimations } from '../../utils.js';

export const title = 'Meridian Gateway — AI Infrastructure Platform — Stefan Kirov';

export const meta = {
  title:       'Meridian Gateway — AI Infrastructure Platform — Stefan Kirov',
  description: 'Meridian Gateway is an AI infrastructure platform that gives engineering teams control over LLM usage, budgets, caching, and failover. Built by Stefan Kirov.',
  url:         'https://stefankirov.com/projects/meridian-gateway',
  image:       'https://stefankirov.com/og-image.png',
};

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
 
    <div class="project-header-links">
      <a href="/#contact" class="btn-primary" data-link>Discuss this project ↓</a>
    </div>
  </div>

  <!-- Screenshots -->
  <div class="meridian-screenshots reveal">
    <img
      src="/meridian1.png"
      alt="Meridian Gateway admin dashboard showing total requests, cost, cache hit rate, and active tenants"
      class="meridian-screenshot"
      loading="eager"
      width="1200"
      height="750"
    />
    <img
      src="/meridian2.png"
      alt="Meridian Gateway request log showing per-tenant API calls, model usage, and response status"
      class="meridian-screenshot"
      loading="lazy"
      width="1200"
      height="750"
    />
  </div>

  <!-- Overview + Stats -->
  <div class="project-overview">
    <div class="project-overview-text reveal">
      <p class="project-overview-label">Overview</p>
      <p>Meridian sits between your teams and the AI models they use — giving you control over who can access AI, what they can spend, and what happens when something goes wrong.</p>
      <p>Built for organisations where AI is becoming critical infrastructure, not just an experiment.</p>
      <p>The gateway is a transparent proxy — drop it in front of any OpenAI, Anthropic or other - compatible client and you get observability, cost controls, and failover with no code changes in the calling app.</p>
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
      <div class="meridian-feat reveal">
        <div class="meridian-feat-icon">◬</div>
        <p class="meridian-feat-title">Langfuse Integration</p>
        <p class="meridian-feat-desc">Deep observability, prompt management & versioning powered by Langfuse, enabled per-tenant via feature flags. Every request generates a full trace — all linked to prompt versions for easy A/B analysis. Allows prompt versioning and changes to be updated instantly without redeployments of your code.</p>
      </div>
    </div>
  </div>

  <!-- Architecture (placeholder) -->
  <div class="project-section">
    <h2 class="project-section-title">Architecture &amp; How It Works</h2>
    <a href="/#contact" class="btn-primary" data-link>Let's Talk ↓</a>
  </div>

  <!-- Challenges & Decisions -->
  <div class="project-section project-section--alt">
    <h2 class="project-section-title">Challenges &amp; Decisions</h2>
    <div class="meridian-decisions reveal" style="margin-top:0">
      <div class="meridian-decisions-col">
        <p class="meridian-decisions-heading">Key Engineering Decisions</p>
        <ul class="meridian-decisions-list">
          <li><span class="meridian-decision-arrow">→</span><span><strong>Provider abstraction layer</strong> — seamless failover between OpenAI and Anthropic (add new providers easily)</span></li>
          <li><span class="meridian-decision-arrow">→</span><span><strong>Semantic + exact caching</strong> — reduce repeated calls</span></li>
          <li><span class="meridian-decision-arrow">→</span><span><strong>Tenant isolation model</strong> — per-team API keys and budgets</span></li>
          <li><span class="meridian-decision-arrow">→</span><span><strong>Observability pipeline</strong> — full audit logs + cost attribution</span></li>
          <li><span class="meridian-decision-arrow">→</span><span><strong>Drop-in adoption</strong> — no SDKs, no client changes required</span></li>
        </ul>
      </div>
     
    </div>
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
  _injectJsonLd();
}

export function unmount() {
  document.getElementById('jsonld-meridian')?.remove();
}

function _injectJsonLd() {
  if (document.getElementById('jsonld-meridian')) return;
  const script = document.createElement('script');
  script.id   = 'jsonld-meridian';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Meridian Gateway",
    "applicationCategory": "DeveloperApplication",
    "description": "AI infrastructure platform that gives engineering teams control over LLM usage, spend budgets, semantic caching, automatic failover, and full audit logging.",
    "author": {
      "@type": "Person",
      "name": "Stefan Kirov",
      "url": "https://stefankirov.com"
    },
    "url": "https://stefankirov.com/projects/meridian-gateway",
    "keywords": "AI infrastructure, LLM gateway, OpenAI proxy, Anthropic proxy, API gateway, AI cost control, semantic caching"
  });
  document.head.appendChild(script);
}
