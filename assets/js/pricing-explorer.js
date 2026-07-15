const VIEW_W = 480;
const VIEW_H = 360;
const MARGIN = { top: 44, right: 16, bottom: 30, left: 60 };
const INTERVALS = [30, 15, 5, 1]; // minutes, indexed by slider step 0-3
const GRID_STEPS = 4;

const SERIES = [
  { key: 'dynatrace', label: 'Dynatrace', status: 'bad' },
  { key: 'datadog',   label: 'Datadog',   status: 'bad' },
  { key: 'grafana',   label: 'Grafana',   status: 'bad' },
  { key: 'checkmk',   label: 'Checkmk',   status: 'good' },
];

function computeCosts(cfg, intervalMin, testCases) {
  const executionsPerYear = (60 / intervalMin) * 24 * 365;

  const dynatraceActions = executionsPerYear * testCases * cfg.requestsPerTest;
  const dynatrace = (dynatraceActions / 1000) * cfg.dynatraceRate * cfg.usdToEur;

  const datadogRuns = executionsPerYear * testCases;
  const datadog = (datadogRuns / 1000) * cfg.datadogRate * cfg.usdToEur;

  const grafanaRuns = executionsPerYear * testCases;
  const grafana = (grafanaRuns / 1000) * cfg.grafanaRate * cfg.usdToEur;

  const checkmk = testCases <= cfg.testCaseMin
    ? cfg.checkmkMinPrice
    : cfg.checkmkCurveA * Math.pow(testCases, cfg.checkmkCurveB);

  return { dynatrace, datadog, grafana, checkmk };
}

function makeFormatter(lang) {
  const locale = lang === 'de' ? 'de-DE' : 'en-US';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

function makeCompactFormatter(lang) {
  const locale = lang === 'de' ? 'de-DE' : 'en-US';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', notation: 'compact', maximumFractionDigits: 1 });
}

function makeIntervalLabel(lang, minutes) {
  const unit = lang === 'de' ? 'Min' : 'min';
  return `${minutes} ${unit}`;
}

export function init() {
  const root = document.querySelector('.explorer');
  if (!root) return;

  const cfg = {
    requestsPerTest: parseFloat(root.dataset.requestsPerTest),
    usdToEur: parseFloat(root.dataset.usdToEur),
    dynatraceRate: parseFloat(root.dataset.dynatraceRate),
    datadogRate: parseFloat(root.dataset.datadogRate),
    grafanaRate: parseFloat(root.dataset.grafanaRate),
    checkmkMinPrice: parseFloat(root.dataset.checkmkMinPrice),
    checkmkMaxPrice: parseFloat(root.dataset.checkmkMaxPrice),
    testCaseMin: parseInt(root.dataset.testCaseMin, 10),
    testCaseMax: parseInt(root.dataset.testCaseMax, 10),
    yAxisMax: parseFloat(root.dataset.yAxisMax),
  };

  // Fit a power curve (cost = a * testCases^b) through the two known
  // Checkmk reference points — the smooth "unknown but plausible" shape
  // of a volume-discount curve, computed once from the data-driven anchors.
  cfg.checkmkCurveB = Math.log(cfg.checkmkMaxPrice / cfg.checkmkMinPrice) / Math.log(cfg.testCaseMax / cfg.testCaseMin);
  cfg.checkmkCurveA = cfg.checkmkMinPrice / Math.pow(cfg.testCaseMin, cfg.checkmkCurveB);

  const lang = document.documentElement.lang === 'de' ? 'de' : 'en';
  const fmt = makeFormatter(lang);
  const fmtCompact = makeCompactFormatter(lang);
  const numberFmt = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-US');

  const intervalSlider = document.getElementById('interval-slider');
  const intervalCurrent = document.getElementById('interval-slider-value');
  const testCaseSlider = document.getElementById('testcase-slider');
  const testCaseCurrent = document.getElementById('testcase-slider-value');
  const intervalTrack = intervalSlider.parentElement.querySelector('.explorer__slider-track');
  const testCaseTrack = testCaseSlider.parentElement.querySelector('.explorer__slider-track');

  const gridlines = root.querySelector('.explorer__gridlines');
  const axisY = root.querySelector('.explorer__axis-y');
  const barsGroup = root.querySelector('.explorer__bars');

  const NS = 'http://www.w3.org/2000/svg';
  const plotW = VIEW_W - MARGIN.left - MARGIN.right;
  const plotH = VIEW_H - MARGIN.top - MARGIN.bottom;
  const slotW = plotW / SERIES.length;
  const barW = slotW * 0.56;

  const yScale = (v) => MARGIN.top + plotH - (Math.min(v, cfg.yAxisMax) / cfg.yAxisMax) * plotH;

  function drawAxis() {
    gridlines.innerHTML = '';
    axisY.innerHTML = '';
    for (let i = 0; i <= GRID_STEPS; i++) {
      const value = (cfg.yAxisMax / GRID_STEPS) * i;
      const y = yScale(value);

      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', MARGIN.left);
      line.setAttribute('x2', VIEW_W - MARGIN.right);
      line.setAttribute('y1', y.toFixed(1));
      line.setAttribute('y2', y.toFixed(1));
      gridlines.appendChild(line);

      const text = document.createElementNS(NS, 'text');
      text.setAttribute('x', MARGIN.left - 8);
      text.setAttribute('y', y.toFixed(1));
      text.setAttribute('text-anchor', 'end');
      text.setAttribute('dominant-baseline', 'middle');
      text.textContent = value === 0 ? '0' : fmtCompact.format(value);
      axisY.appendChild(text);
    }
  }

  function ensureBarElements() {
    if (barsGroup.children.length) return;
    SERIES.forEach((s, i) => {
      const barX = MARGIN.left + i * slotW + (slotW - barW) / 2;
      const centerX = barX + barW / 2;

      const rect = document.createElementNS(NS, 'rect');
      rect.setAttribute('class', `explorer__bar explorer__bar--${s.status} explorer__bar--${s.key}`);
      rect.setAttribute('x', barX.toFixed(1));
      rect.setAttribute('width', barW.toFixed(1));
      rect.setAttribute('y', (MARGIN.top + plotH).toFixed(1));
      rect.setAttribute('height', 0);
      barsGroup.appendChild(rect);

      const breakMark = document.createElementNS(NS, 'polyline');
      breakMark.setAttribute('class', `explorer__bar-break explorer__bar-break--${s.key}`);
      breakMark.setAttribute('fill', 'none');
      breakMark.setAttribute('points', '');
      barsGroup.appendChild(breakMark);

      const valueText = document.createElementNS(NS, 'text');
      valueText.setAttribute('class', `explorer__bar-value explorer__bar-value--${s.key}`);
      valueText.setAttribute('x', centerX.toFixed(1));
      barsGroup.appendChild(valueText);

      const offText = document.createElementNS(NS, 'text');
      offText.setAttribute('class', `explorer__bar-value explorer__bar-value--capped explorer__bar-off--${s.key}`);
      offText.setAttribute('x', centerX.toFixed(1));
      offText.style.fontSize = '10px';
      barsGroup.appendChild(offText);

      const label = document.createElementNS(NS, 'text');
      label.setAttribute('class', 'explorer__bar-label');
      label.setAttribute('x', centerX.toFixed(1));
      label.setAttribute('y', MARGIN.top + plotH + 18);
      label.textContent = s.label;
      barsGroup.appendChild(label);
    });
  }

  function render() {
    const intervalMin = INTERVALS[parseInt(intervalSlider.value, 10)];
    const testCases = parseInt(testCaseSlider.value, 10);
    const costs = computeCosts(cfg, intervalMin, testCases);

    const intervalPct = (parseInt(intervalSlider.value, 10) / (INTERVALS.length - 1)) * 100;
    intervalTrack.style.setProperty('--fill', `${intervalPct}%`);
    intervalCurrent.textContent = makeIntervalLabel(lang, intervalMin);

    const testCasePct = ((testCases - cfg.testCaseMin) / (cfg.testCaseMax - cfg.testCaseMin)) * 100;
    testCaseTrack.style.setProperty('--fill', `${testCasePct}%`);
    testCaseCurrent.textContent = numberFmt.format(testCases);

    SERIES.forEach(s => {
      const value = costs[s.key];
      const capped = value > cfg.yAxisMax;
      const barTop = yScale(value);
      const barX = MARGIN.left + SERIES.indexOf(s) * slotW + (slotW - barW) / 2;

      const rect = barsGroup.querySelector(`.explorer__bar--${s.key}`);
      rect.setAttribute('y', barTop.toFixed(1));
      rect.setAttribute('height', ((MARGIN.top + plotH) - barTop).toFixed(1));

      const breakMark = barsGroup.querySelector(`.explorer__bar-break--${s.key}`);
      const valueText = barsGroup.querySelector(`.explorer__bar-value--${s.key}`);
      const offText = barsGroup.querySelector(`.explorer__bar-off--${s.key}`);

      if (capped) {
        const zigY = MARGIN.top;
        const points = [
          [barX, zigY + 5],
          [barX + barW * 0.25, zigY - 5],
          [barX + barW * 0.5, zigY + 5],
          [barX + barW * 0.75, zigY - 5],
          [barX + barW, zigY + 5],
        ].map(p => p.join(',')).join(' ');
        breakMark.setAttribute('points', points);

        valueText.setAttribute('y', MARGIN.top - 22);
        valueText.classList.add('explorer__bar-value--capped');
        valueText.textContent = fmtCompact.format(value);

        offText.setAttribute('y', MARGIN.top - 10);
        offText.textContent = lang === 'de' ? 'außerhalb der Skala' : 'off the chart';
      } else {
        breakMark.setAttribute('points', '');

        valueText.setAttribute('y', (barTop - 10).toFixed(1));
        valueText.classList.remove('explorer__bar-value--capped');
        valueText.textContent = fmt.format(value);

        offText.textContent = '';
      }
    });
  }

  drawAxis();
  ensureBarElements();
  render();

  intervalSlider.addEventListener('input', render);
  testCaseSlider.addEventListener('input', render);
}
