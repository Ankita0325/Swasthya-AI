// src/components/patient/PatientHealthGraph.tsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { healthGraphNodes, healthGraphLinks } from '../../data/clinicalData';
import Card from '../ui/Card';

interface Node {
  id: string;
  label: string;
  type: string;
  details: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
}

interface Link {
  source: string;
  target: string;
  label?: string;
}

export const PatientHealthGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  // Dimensions
  const width = 600;
  const height = 400;

  // Initialize nodes with random positions near center
  const [nodes, setNodes] = useState<Node[]>(() => {
    return healthGraphNodes.map((n) => ({
      ...n,
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100,
      vx: 0,
      vy: 0,
      fx: null,
      fy: null
    }));
  });

  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

  // Index maps for quick traversal
  const connectedNodeIds = useMemo(() => {
    if (!hoverNodeId) return new Set<string>();
    const neighbors = new Set<string>([hoverNodeId]);
    healthGraphLinks.forEach((l) => {
      if (l.source === hoverNodeId) neighbors.add(l.target);
      if (l.target === hoverNodeId) neighbors.add(l.source);
    });
    return neighbors;
  }, [hoverNodeId]);

  // Color mapping
  const getNodeColor = (type: string, isHovered: boolean) => {
    if (hoverNodeId && !connectedNodeIds.has(type)) {
      // faded state
    }
    switch (type) {
      case 'patient': return '#0474FC';
      case 'condition': return '#DC2626';
      case 'medication': return '#10B981';
      case 'lifestyle': return '#F59E0B';
      case 'habit': return '#8B5CF6';
      case 'symptom': return '#EC4899';
      case 'lab': return '#06B6D4';
      case 'vital': return '#14B8A6';
      default: return '#64748B';
    }
  };

  // Run custom physics loop
  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      setNodes((prevNodes) => {
        const nextNodes = prevNodes.map((n) => ({ ...n }));

        // 1. Center Pull Force
        const cx = width / 2;
        const cy = height / 2;
        nextNodes.forEach((n) => {
          if (n.fx !== null) return;
          n.vx += (cx - n.x) * 0.003;
          n.vy += (cy - n.y) * 0.003;
        });

        // 2. Many-Body Repulsion (all nodes repel each other)
        for (let i = 0; i < nextNodes.length; i++) {
          for (let j = i + 1; j < nextNodes.length; j++) {
            const dx = nextNodes[j].x - nextNodes[i].x;
            const dy = nextNodes[j].y - nextNodes[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1.0;
            
            if (dist < 150) {
              const force = (150 - dist) * 0.02;
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;
              
              if (nextNodes[i].fx === null) {
                nextNodes[i].vx -= fx;
                nextNodes[i].vy -= fy;
              }
              if (nextNodes[j].fx === null) {
                nextNodes[j].vx += fx;
                nextNodes[j].vy += fy;
              }
            }
          }
        }

        // 3. Link Spring Attraction (attract source and target)
        healthGraphLinks.forEach((link) => {
          const sNode = nextNodes.find((n) => n.id === link.source);
          const tNode = nextNodes.find((n) => n.id === link.target);

          if (sNode && tNode) {
            const dx = tNode.x - sNode.x;
            const dy = tNode.y - sNode.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1.0;
            const desiredDist = 100;
            const strength = 0.015;

            const force = (dist - desiredDist) * strength;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (sNode.fx === null) {
              sNode.vx += fx;
              sNode.vy += fy;
            }
            if (tNode.fx === null) {
              tNode.vx -= fx;
              tNode.vy -= fy;
            }
          }
        });

        // 4. Update Positions (Apply Velocity & Friction)
        nextNodes.forEach((n) => {
          if (n.fx !== null) {
            n.x = n.fx;
            n.y = n.fy;
            n.vx = 0;
            n.vy = 0;
          } else {
            n.vx *= 0.85;
            n.vy *= 0.85;
            n.x += n.vx;
            n.y += n.vy;

            // Bounds constraint
            const r = 25;
            n.x = Math.max(r, Math.min(width - r, n.x));
            n.y = Math.max(r, Math.min(height - r, n.y));
          }
        });

        return nextNodes;
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Pointer Drag handlers
  const handlePointerDown = (e: React.PointerEvent, nodeId: string) => {
    e.preventDefault();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (err) {}
    setDraggedNodeId(nodeId);
    
    // Pin node position
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === nodeId) {
          const rect = svgRef.current?.getBoundingClientRect();
          const mx = rect ? e.clientX - rect.left : n.x;
          const my = rect ? e.clientY - rect.top : n.y;
          return { ...n, fx: mx, fy: my };
        }
        return n;
      })
    );
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggedNodeId) return;

    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === draggedNodeId) {
          return { ...n, fx: mx, fy: my };
        }
        return n;
      })
    );
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggedNodeId) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {}
    
    // Unpin node
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === draggedNodeId) {
          return { ...n, fx: null, fy: null };
        }
        return n;
      })
    );
    setDraggedNodeId(null);
  };

  const activeNodeInfo = useMemo(() => {
    return nodes.find((n) => n.id === hoverNodeId);
  }, [hoverNodeId, nodes]);

  return (
    <Card style={{ padding: '24px', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
          Interactive Health Memory Graph
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
          Drag nodes to explore relationship vectors. Hover nodes to see clinical linkages.
        </p>
      </div>

      <div style={{ position: 'relative', width: '100%', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)' }}>
        <svg
          ref={svgRef}
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ overflow: 'visible' }}
        >
          {/* Render Links */}
          {healthGraphLinks.map((link, idx) => {
            const sourceNode = nodes.find((n) => n.id === link.source);
            const targetNode = nodes.find((n) => n.id === link.target);

            if (!sourceNode || !targetNode) return null;

            const isHighlighted = hoverNodeId
              ? (link.source === hoverNodeId || link.target === hoverNodeId)
              : true;

            return (
              <g key={idx}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isHighlighted ? 'var(--accent)' : 'var(--border)'}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeOpacity={isHighlighted ? 0.75 : 0.2}
                />
              </g>
            );
          })}

          {/* Render Nodes */}
          {nodes.map((node) => {
            const isNeighbor = hoverNodeId ? connectedNodeIds.has(node.id) : true;
            const opacity = isNeighbor ? 1 : 0.25;

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoverNodeId(node.id)}
                onMouseLeave={() => setHoverNodeId(null)}
                onPointerDown={(e) => handlePointerDown(e, node.id)}
                style={{ cursor: 'grab', opacity, transition: 'opacity 0.2s' }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.type === 'patient' ? 24 : 16}
                  fill={getNodeColor(node.type, hoverNodeId === node.id)}
                  stroke="var(--surface)"
                  strokeWidth="2"
                  style={{
                    filter: hoverNodeId === node.id ? 'drop-shadow(0px 0px 8px var(--accent))' : 'none'
                  }}
                />
                <text
                  x={node.x}
                  y={node.y + (node.type === 'patient' ? 36 : 28)}
                  fill="var(--text-primary)"
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Detail Callout */}
        {activeNodeInfo && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              backgroundColor: 'var(--surface)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '10px 14px',
              maxWidth: '220px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 10,
              fontSize: '12px',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px', textTransform: 'capitalize' }}>
              {activeNodeInfo.type}: {activeNodeInfo.label}
            </div>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {activeNodeInfo.details}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PatientHealthGraph;
