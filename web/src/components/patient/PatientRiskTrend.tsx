// src/components/patient/PatientRiskTrend.tsx
import React from 'react';
import { mainPatient } from '../../data/clinicalData';
import Card from '../ui/Card';

export const PatientRiskTrend: React.FC = () => {
  const data = mainPatient.riskTrend;
  
  // Chart dimensions
  const width = 500;
  const height = 180;
  const paddingX = 40;
  const paddingY = 20;

  // Find min/max for scaling
  const maxScore = 100;
  const minScore = 0;

  // Calculate points
  const points = data.map((d, i) => {
    const x = paddingX + (i * (width - paddingX * 2)) / (data.length - 1);
    const y = height - paddingY - (d.score * (height - paddingY * 2)) / maxScore;
    return { x, y, score: d.score, date: d.date };
  });

  // Construct SVG Path strings
  const linePath = points.reduce((path, p, i) => {
    return path + `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y} `;
  }, '');

  const areaPath = linePath
    ? `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : '';

  return (
    <Card style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
        Historical Risk Index
      </h3>

      <div style={{ position: 'relative', width: '100%' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = height - paddingY - (val * (height - paddingY * 2)) / maxScore;
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  fill="var(--text-secondary)"
                  fontSize="10"
                  textAnchor="end"
                  fontWeight="600"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Area under the line */}
          {areaPath && <path d={areaPath} fill="url(#riskGrad)" />}

          {/* Line path */}
          {linePath && (
            <path
              d={linePath}
              stroke="var(--accent)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Nodes */}
          {points.map((p, idx) => (
            <g key={idx} className="chart-node">
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="10"
                fill="transparent"
                style={{ cursor: 'pointer' }}
              />
              <text
                x={p.x}
                y={height - 6}
                fill="var(--text-secondary)"
                fontSize="10"
                textAnchor="middle"
                fontWeight="500"
              >
                {p.date.split('-').slice(1).join('/')}
              </text>
              {/* Tooltip on Node */}
              <title>{`${p.date}: ${p.score}% risk`}</title>
            </g>
          ))}
        </svg>
      </div>
    </Card>
  );
};

export default PatientRiskTrend;
