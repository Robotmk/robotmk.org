const MARGIN = { top: 16, right: 92, bottom: 34, left: 52 };
const VIEW_W = 760;
const VIEW_H = 380;
const INTERVALS = [30, 15, 5, 1]; // minutes, indexed by slider step 0-3

const SERIES = [
  { key: 'dynatrace', label: 'Dynatrace' },
  { key: 'datadog',   label: 'Datadog' },
  { key: 'checkmk',   label: 'Checkmk' },
];

function niceMax(value) {
  if (value <= 0) return 1;
  const exp = Math.floor(Math.log10(value));
  const base = Math.pow(10, exp);
  const frac = value / base;
  let niceFrac;
  if (frac <= 1) niceFrac = 1;
  else if (frac <= 2) niceFrac = 2;
  else if (frac <= 5) niceFrac = 5;
  else niceFrac = 10;
  return niceFrac * base;
}

function computeSeries(cfg, intervalMin) {
  const executionsPerYear = (60 / intervalMin) * 24 * 365;
  const points = { dynatrace: [], datadog: [], checkmk: [] };

  for (let tc = 1; tc <= cfg.maxTestCases; tc++) {
    const actions = executionsPerYear * tc * cfg.requestsPerTest;
    const dynatraceEur = (actions / 1000) * cfg.dynatraceRate * cfg.usdToEur;

    const runs = executionsPerYear * tc;
    const datadogEur = (runs / 1000) * cfg.datadogRate * cfg.usdToEur;

    const checkmkEur = tc * cfg.checkmkRate;

    points.dynatrace.push({ x: tc, y: dynatraceEur });
    points.datadog.push({ x: tc, y: datadogEur });
    points.checkmk.push({ x: tc, y: checkmkEur });
  }
  return points;
}

function makeScales(cfg, yMax) {
  const plotW = VIEW_W - MARGIN.left - MARGIN.right;
  const plotH = VIEW_H - MARGIN.top - MARGIN.bottom;
  const xScale = (tc) => MARGIN.left + ((tc - 1) / (cfg.maxTestCases - 1)) * plotW;
  const yScale = (v) => MARGIN.top + plotH - (v / yMax) * plotH;
  return { xScale, yScale, plotW, plotH };
}

function pathFor(points, xScale, yScale) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xScale(p.x).toFixed(1)},${yScale(p.y).toFixed(1)}`).join(' ');
}

function makeFormatter(lang) {
  const locale = lang === 'de' ? 'de-DE' : 'en-US';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
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
    checkmkRate: parseFloat(root.dataset.checkmkRate),
    maxTestCases: parseInt(root.dataset.maxTestCases, 10),
  };
  const lang = document.documentElement.lang === 'de' ? 'de' : 'en';
  const fmt = makeFormatter(lang);

  const svg = root.querySelector('.explorer__svg');
  const slider = root.querySelector('.explorer__range');
  const sliderTrack = root.querySelector('.explorer__slider-track');
  const sliderCurrent = root.querySelector('.explorer__slider-current');
  const gridlines = root.querySelector('.explorer__gridlines');
  const axisY = root.querySelector('.explorer__axis-y');
  const axisX = root.querySelector('.explorer__axis-x');
  const endlabels = root.querySelector('.explorer__endlabels');
  const crosshair = root.querySelector('.explorer__crosshair');
  const hoverdotsGroup = root.querySelector('.explorer__hoverdots');
  const overlay = root.querySelector('.explorer__overlay');
  const tooltip = root.querySelector('.explorer__tooltip');
  const chartWrap = root.querySelector('.explorer__chart-wrap');

  const NS = 'http://www.w3.org/2000/svg';
  let currentData = null;
  let currentYMax = 1;
  let currentScales = null;

  function render() {
    const intervalMin = INTERVALS[parseInt(slider.value, 10)];
    const data = computeSeries(cfg, intervalMin);
    const maxValue = Math.max(...SERIES.map(s => data[s.key][data[s.key].length - 1].y));
    const yMax = niceMax(maxValue);
    const { xScale, yScale, plotW, plotH } = makeScales(cfg, yMax);

    currentData = data;
    currentYMax = yMax;
    currentScales = { xScale, yScale };

    // Slider fill + readout
    const pct = (parseInt(slider.value, 10) / (INTERVALS.length - 1)) * 100;
    sliderTrack.style.setProperty('--fill', `${pct}%`);
    root.style.setProperty('--fill', `${pct}%`);
    sliderCurrent.textContent = makeIntervalLabel(lang, intervalMin);

    // Gridlines + y-axis ticks (4 steps)
    gridlines.innerHTML = '';
    axisY.innerHTML = '';
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const value = (yMax / steps) * i;
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
      text.textContent = value === 0 ? '0' : fmt.format(value);
      axisY.appendChild(text);
    }

    // x-axis ticks: every 5 test cases, plus the max if not already included
    axisX.innerHTML = '';
    const xTicks = [];
    for (let tc = 5; tc <= cfg.maxTestCases; tc += 5) xTicks.push(tc);
    if (xTicks[xTicks.length - 1] !== cfg.maxTestCases) xTicks.push(cfg.maxTestCases);
    if (xTicks[0] !== 1) xTicks.unshift(1);
    xTicks.forEach(tc => {
      const text = document.createElementNS(NS, 'text');
      text.setAttribute('x', xScale(tc).toFixed(1));
      text.setAttribute('y', VIEW_H - MARGIN.bottom + 18);
      text.setAttribute('text-anchor', 'middle');
      text.textContent = tc;
      axisX.appendChild(text);
    });

    // Lines
    SERIES.forEach(s => {
      const path = root.querySelector(`.explorer__line--${s.key}`);
      path.setAttribute('d', pathFor(data[s.key], xScale, yScale));
    });

    // End labels, with simple vertical decluttering
    endlabels.innerHTML = '';
    const ends = SERIES.map(s => {
      const last = data[s.key][data[s.key].length - 1];
      return { key: s.key, label: s.label, value: last.y, y: yScale(last.y) };
    }).sort((a, b) => a.y - b.y);

    const minGap = 15;
    for (let i = 1; i < ends.length; i++) {
      if (ends[i].y - ends[i - 1].y < minGap) {
        ends[i].y = ends[i - 1].y + minGap;
      }
    }

    ends.forEach(e => {
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', `explorer__endlabel explorer__endlabel--${e.key}`);
      g.setAttribute('transform', `translate(${VIEW_W - MARGIN.right + 10}, ${e.y.toFixed(1)})`);

      const circle = document.createElementNS(NS, 'circle');
      circle.setAttribute('cx', 0);
      circle.setAttribute('cy', 0);
      g.appendChild(circle);

      const text = document.createElementNS(NS, 'text');
      text.setAttribute('x', 8);
      text.setAttribute('y', 0);
      text.setAttribute('dominant-baseline', 'middle');
      text.textContent = fmt.format(e.value);
      g.appendChild(text);

      endlabels.appendChild(g);
    });
  }

  function updateHover(clientX) {
    const rect = svg.getBoundingClientRect();
    const svgX = ((clientX - rect.left) / rect.width) * VIEW_W;
    const { xScale, yScale } = currentScales;
    const plotLeft = MARGIN.left;
    const plotRight = VIEW_W - MARGIN.right;
    const clampedX = Math.max(plotLeft, Math.min(plotRight, svgX));

    const tc = Math.round(
      1 + ((clampedX - plotLeft) / (plotRight - plotLeft)) * (cfg.maxTestCases - 1)
    );
    const tcClamped = Math.max(1, Math.min(cfg.maxTestCases, tc));
    const px = xScale(tcClamped);

    crosshair.setAttribute('x1', px.toFixed(1));
    crosshair.setAttribute('x2', px.toFixed(1));
    crosshair.setAttribute('y1', MARGIN.top);
    crosshair.setAttribute('y2', VIEW_H - MARGIN.bottom);
    crosshair.classList.add('is-active');
    hoverdotsGroup.classList.add('is-active');

    const rows = SERIES.map(s => {
      const point = currentData[s.key][tcClamped - 1];
      const dot = hoverdotsGroup.querySelector(`.explorer__hoverdot--${s.key}`);
      dot.setAttribute('cx', px.toFixed(1));
      dot.setAttribute('cy', yScale(point.y).toFixed(1));
      return { label: s.label, key: s.key, value: point.y };
    });

    tooltip.innerHTML = '';
    const xLine = document.createElement('span');
    xLine.className = 'explorer__tooltip-x';
    xLine.textContent = `${tcClamped} ${root.dataset.xAxisLabel || ''}`;
    tooltip.appendChild(xLine);

    rows.forEach(r => {
      const row = document.createElement('div');
      row.className = 'explorer__tooltip-row';
      const key = document.createElement('span');
      key.className = `explorer__tooltip-key explorer__tooltip-key--${r.key}`;
      key.style.background = r.key === 'checkmk' ? 'var(--color-primary)' : 'var(--color-error)';
      row.appendChild(key);
      const text = document.createElement('span');
      text.textContent = `${r.label}: ${fmt.format(r.value)}`;
      row.appendChild(text);
      tooltip.appendChild(row);
    });

    tooltip.hidden = false;
    const wrapRect = chartWrap.getBoundingClientRect();
    const tooltipX = (px / VIEW_W) * wrapRect.width;
    tooltip.style.left = `${Math.max(60, Math.min(wrapRect.width - 60, tooltipX))}px`;
  }

  function hideHover() {
    crosshair.classList.remove('is-active');
    hoverdotsGroup.classList.remove('is-active');
    tooltip.hidden = true;
  }

  slider.addEventListener('input', render);
  overlay.addEventListener('pointermove', (e) => updateHover(e.clientX));
  overlay.addEventListener('pointerleave', hideHover);
  overlay.addEventListener('pointerdown', (e) => updateHover(e.clientX));

  render();
}
