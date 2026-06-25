// ================================
// PART 1: RENDER PAPERS SIDEBAR
// ================================

function renderPapers() {
  const list = document.getElementById('papers-list');

  RESEARCH_PAPERS.forEach(paper => {
    const card = document.createElement('div');
    card.className = 'paper-card';

    card.innerHTML = `
      <div class="paper-title">${paper.shortName}</div>
      <div class="paper-meta">${paper.authors} · ${paper.year}</div>
      <div class="paper-meta" style="margin-top:4px;">${paper.focus}</div>
      <span class="paper-tag">${paper.tag}</span>
    `;

    list.appendChild(card);
  });
}

// Page load হলে papers render করো
renderPapers();
// ================================
// PART 2: SCAN LOGIC
// ================================

function runScan() {
  const code = document.getElementById('code-input').value;

  // খালি হলে কিছু করব না
  if (code.trim() === '') {
    alert('Please paste some code first.');
    return;
  }

  // সব pattern চেক করো
  const foundIssues = [];

  HALLUCINATION_PATTERNS.forEach(pattern => {
    const matches = code.match(pattern.pattern);

    if (matches) {
      // কোন line-এ আছে খুঁজে বের করো
      const lines = code.split('\n');
      let lineNumber = 0;

      lines.forEach((line, index) => {
        if (pattern.pattern.test(line)) {
          lineNumber = index + 1;
          pattern.pattern.lastIndex = 0;
        }
      });

      foundIssues.push({
        ...pattern,
        lineNumber: lineNumber,
        matchedText: matches[0]
      });
    }
  });

  // Results দেখাও
  displayResults(foundIssues);
  updateStats(foundIssues);
  updateScore(foundIssues);
}

function clearAll() {
  document.getElementById('code-input').value = '';
  document.getElementById('results-panel').style.display = 'none';
  document.getElementById('score-panel').style.display = 'none';
  document.getElementById('stat-issues').textContent = '0';
  document.getElementById('stat-high').textContent = '0';
  document.getElementById('stat-score').textContent = '—';
  document.getElementById('stat-types').textContent = '0';
}

function loadExample() {
  document.getElementById('code-input').value =
`import numpy as np
from sklearn.magic import AutoFix
import pandas as pd

model = AutoFix()
result = model.auto_correct(data, fix=True)
cleaned = df.pandas.enhance.smartClean(df)`;
}
// ================================
// PART 3: DISPLAY RESULTS
// ================================

function displayResults(issues) {
  const panel = document.getElementById('results-panel');
  const list = document.getElementById('issues-list');
  const emptyState = document.getElementById('empty-state');
  const count = document.getElementById('results-count');

  // panel দেখাও
  panel.style.display = 'block';
  list.innerHTML = '';

  if (issues.length === 0) {
    emptyState.style.display = 'block';
    count.textContent = '0 issues';
    return;
  }

  emptyState.style.display = 'none';
  count.textContent = `${issues.length} issue${issues.length > 1 ? 's' : ''} found`;

  issues.forEach(issue => {
    const card = document.createElement('div');
    card.className = `issue-card severity-${issue.severity}`;

    card.innerHTML = `
      <div class="issue-header">
        <span class="issue-type type-${issue.severity}">${issue.type}</span>
        <span class="issue-line">Line ${issue.lineNumber}</span>
      </div>
      <div class="issue-title">${issue.title}</div>
      <div class="issue-desc">${issue.desc}</div>
      <div class="fix-box">
        <div class="fix-label">✓ Suggested fix</div>
        <div class="fix-code">${issue.fix}</div>
      </div>
      <div style="margin-top:10px;font-size:11px;color:#7F77DD;">
        📄 ${issue.paper}
      </div>
    `;

    list.appendChild(card);
  });
}

// ================================
// PART 4: UPDATE STATS + SCORE
// ================================

function updateStats(issues) {
  const highCount = issues.filter(i => i.severity === 'high').length;
  const types = [...new Set(issues.map(i => i.type))].length;

  document.getElementById('stat-issues').textContent = issues.length;
  document.getElementById('stat-high').textContent = highCount;
  document.getElementById('stat-types').textContent = types;
}

function updateScore(issues) {
  if (issues.length === 0) return;

  const panel = document.getElementById('score-panel');
  panel.style.display = 'block';

  // Score calculate করো
  let score = 0;
  issues.forEach(issue => {
    if (issue.severity === 'high') score += 25;
    if (issue.severity === 'medium') score += 15;
    if (issue.severity === 'low') score += 8;
  });
  score = Math.min(score, 100);

  // Number update করো
  document.getElementById('score-number').textContent = score;
  document.getElementById('stat-score').textContent = score;

  // Risk label
  const riskLabel = document.getElementById('risk-label');
  if (score >= 60) {
    riskLabel.textContent = 'High Risk';
    riskLabel.className = 'risk-label risk-high';
  } else if (score >= 30) {
    riskLabel.textContent = 'Medium Risk';
    riskLabel.className = 'risk-label risk-medium';
  } else {
    riskLabel.textContent = 'Low Risk';
    riskLabel.className = 'risk-label risk-low';
  }

  // SVG ring animate করো
  const circle = document.getElementById('score-circle');
  const circumference = 213.6;
  const offset = circumference - (score / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  if (score >= 60) circle.setAttribute('stroke', '#E24B4A');
  else if (score >= 30) circle.setAttribute('stroke', '#EF9F27');
  else circle.setAttribute('stroke', '#4caf7d');

  // Type bars render করো
  const typeCounts = {};
  issues.forEach(issue => {
    typeCounts[issue.type] = (typeCounts[issue.type] || 0) + 1;
  });

  const barsContainer = document.getElementById('type-bars');
  barsContainer.innerHTML = '';
  const maxCount = Math.max(...Object.values(typeCounts));

  Object.entries(typeCounts).forEach(([type, count]) => {
    const fillClass = type === 'Fabricated Package' ? 'fill-high'
      : type === 'Non-existent Method' ? 'fill-medium'
      : 'fill-low';

    const width = Math.round((count / maxCount) * 100);

    barsContainer.innerHTML += `
      <div class="bar-item">
        <div class="bar-label-row">
          <span>${type}</span>
          <span>${count}</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill ${fillClass}" style="width:${width}%"></div>
        </div>
      </div>
    `;
  });
}