import { subscribe, publish } from '../../shared/eventBus.js';
import { Events } from './portfolio.events.js';
import { portfolioRepository } from './portfolio.repository.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// Each handler does ONE step and emits the next event: a small choreographed saga.
export function registerPortfolioHandlers() {
  subscribe(Events.PublishRequested, ({ publishId, portfolio }) => {
    const errors = [];
    if (!portfolio?.name?.trim()) errors.push('Name is required');
    if (!portfolio?.title?.trim()) errors.push('Title is required');
    if (!Array.isArray(portfolio?.projects) || portfolio.projects.length === 0) errors.push('Add at least one project');
    if (errors.length) return publish(Events.Failed, { publishId, errors });
    publish(Events.Validated, { publishId, portfolio });
  });

  subscribe(Events.Validated, async ({ publishId, portfolio }) => {
    await wait(900); // simulated build / render work
    publish(Events.Built, { publishId, portfolio: { ...portfolio,
        slug: slugify(portfolio.name), builtAt: new Date().toISOString() } });
  });

  subscribe(Events.Built, async ({ publishId, portfolio }) => {
    try {
      await wait(600);
      await portfolioRepository.savePublished(portfolio);
      publish(Events.Published, { publishId, portfolio });
    } catch (e) { publish(Events.Failed, { publishId, errors: [e.message] }); }
  });
}
