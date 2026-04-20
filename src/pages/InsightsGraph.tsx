import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { conceptArticles, clusterMeta, type ConceptCluster } from "@/lib/conceptClusters";

interface Node {
  id: string;
  label: string;
  cluster: ConceptCluster;
  x: number;
  y: number;
  connections: number;
}

interface Edge {
  from: string;
  to: string;
  weight: number; // shared concepts count
}

const clusterColors: Record<ConceptCluster, string> = {
  risk: "hsl(0, 72%, 51%)",
  approval: "hsl(142, 71%, 45%)",
  "provider-behaviour": "hsl(221, 83%, 53%)",
  "payment-methods": "hsl(38, 92%, 50%)",
};

const clusterColorsBg: Record<ConceptCluster, string> = {
  risk: "hsl(0, 72%, 95%)",
  approval: "hsl(142, 71%, 93%)",
  "provider-behaviour": "hsl(221, 83%, 93%)",
  "payment-methods": "hsl(38, 92%, 93%)",
};

const InsightsGraph = () => {
  useSEO({ title: "Insights Knowledge Graph — ChosePayments", description: "Visual map of payment processing concepts and how our insight articles connect.", noIndex: true });
  const [selectedCluster, setSelectedCluster] = useState<ConceptCluster | "all">("all");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Build edges from shared concepts
  const { nodes, edges } = useMemo(() => {
    const edgeMap = new Map<string, number>();
    const connectionCount = new Map<string, number>();

    for (let i = 0; i < conceptArticles.length; i++) {
      for (let j = i + 1; j < conceptArticles.length; j++) {
        const a = conceptArticles[i];
        const b = conceptArticles[j];
        const shared = a.concepts.filter(c => b.concepts.includes(c)).length;
        if (shared > 0) {
          const key = `${a.slug}|||${b.slug}`;
          edgeMap.set(key, shared);
          connectionCount.set(a.slug, (connectionCount.get(a.slug) || 0) + 1);
          connectionCount.set(b.slug, (connectionCount.get(b.slug) || 0) + 1);
        }
      }
    }

    const edges: Edge[] = [];
    edgeMap.forEach((weight, key) => {
      const [from, to] = key.split("|||");
      edges.push({ from, to, weight });
    });

    // Position nodes in cluster groups
    const clusterGroups: Record<ConceptCluster, typeof conceptArticles> = {
      risk: [],
      approval: [],
      "provider-behaviour": [],
      "payment-methods": [],
    };

    conceptArticles.forEach(a => {
      clusterGroups[a.concepts[0]].push(a);
    });

    const width = 900;
    const height = 700;
    const centerX = width / 2;
    const centerY = height / 2;

    const clusterCenters: Record<ConceptCluster, { x: number; y: number }> = {
      risk: { x: centerX - 220, y: centerY - 180 },
      approval: { x: centerX + 220, y: centerY - 180 },
      "provider-behaviour": { x: centerX + 220, y: centerY + 180 },
      "payment-methods": { x: centerX - 220, y: centerY + 180 },
    };

    const nodes: Node[] = [];
    Object.entries(clusterGroups).forEach(([cluster, articles]) => {
      const center = clusterCenters[cluster as ConceptCluster];
      articles.forEach((article, i) => {
        const angle = (2 * Math.PI * i) / articles.length - Math.PI / 2;
        const radius = 60 + articles.length * 8;
        nodes.push({
          id: article.slug,
          label: article.shortTitle,
          cluster: cluster as ConceptCluster,
          x: center.x + Math.cos(angle) * radius,
          y: center.y + Math.sin(angle) * radius,
          connections: connectionCount.get(article.slug) || 0,
        });
      });
    });

    return { nodes, edges };
  }, []);

  const filteredEdges = useMemo(() => {
    if (selectedCluster === "all") return edges;
    const clusterSlugs = new Set(
      nodes.filter(n => n.cluster === selectedCluster).map(n => n.id)
    );
    return edges.filter(e => clusterSlugs.has(e.from) || clusterSlugs.has(e.to));
  }, [edges, nodes, selectedCluster]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, Node>();
    nodes.forEach(n => map.set(n.id, n));
    return map;
  }, [nodes]);

  const connectedToHovered = useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    const connected = new Set<string>();
    connected.add(hoveredNode);
    edges.forEach(e => {
      if (e.from === hoveredNode) connected.add(e.to);
      if (e.to === hoveredNode) connected.add(e.from);
    });
    return connected;
  }, [hoveredNode, edges]);

  const isVisible = useCallback((nodeId: string) => {
    if (selectedCluster === "all") return true;
    const node = nodeMap.get(nodeId);
    if (!node) return false;
    if (node.cluster === selectedCluster) return true;
    // Also show if connected to a node in the selected cluster
    return filteredEdges.some(e => 
      (e.from === nodeId || e.to === nodeId)
    );
  }, [selectedCluster, nodeMap, filteredEdges]);

  // Stats
  const stats = useMemo(() => {
    const totalArticles = conceptArticles.length;
    const totalLinks = edges.length;
    const avgConnections = totalArticles > 0 
      ? (edges.reduce((sum, e) => sum + e.weight, 0) * 2 / totalArticles).toFixed(1) 
      : "0";
    const clusterCounts = Object.entries(clusterMeta).map(([key, meta]) => ({
      cluster: key as ConceptCluster,
      label: meta.title,
      count: conceptArticles.filter(a => a.concepts.includes(key as ConceptCluster)).length,
    }));
    return { totalArticles, totalLinks, avgConnections, clusterCounts };
  }, [edges]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-24">
        <div className="section-container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Internal Linking Map
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visualising how articles connect through shared concepts: Risk, Approval, Provider Behaviour, and Payment Methods.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{stats.totalArticles}</div>
              <div className="text-sm text-muted-foreground">Articles</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{stats.totalLinks}</div>
              <div className="text-sm text-muted-foreground">Internal Links</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{stats.avgConnections}</div>
              <div className="text-sm text-muted-foreground">Avg Connections</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-sm text-muted-foreground">Concept Clusters</div>
            </div>
          </div>

          {/* Cluster filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedCluster("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCluster === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All Clusters
            </button>
            {stats.clusterCounts.map(({ cluster, label, count }) => (
              <button
                key={cluster}
                onClick={() => setSelectedCluster(cluster)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCluster === cluster
                    ? "text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                style={selectedCluster === cluster ? { backgroundColor: clusterColors[cluster] } : {}}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: clusterColors[cluster] }}
                />
                {label} ({count})
              </button>
            ))}
          </div>

          {/* Graph */}
          <div className="bg-card border border-border rounded-2xl p-4 overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox="0 0 900 700"
              className="w-full max-w-[900px] mx-auto"
              style={{ minHeight: 400 }}
            >
              {/* Cluster background circles */}
              {Object.entries({
                risk: { x: 230, y: 170 },
                approval: { x: 670, y: 170 },
                "provider-behaviour": { x: 670, y: 530 },
                "payment-methods": { x: 230, y: 530 },
              }).map(([cluster, pos]) => (
                <g key={cluster}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={160}
                    fill={clusterColorsBg[cluster as ConceptCluster]}
                    opacity={
                      selectedCluster === "all" || selectedCluster === cluster ? 0.4 : 0.1
                    }
                    className="transition-opacity duration-300"
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 140}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[11px] font-semibold uppercase tracking-wider"
                    opacity={selectedCluster === "all" || selectedCluster === cluster ? 1 : 0.3}
                  >
                    {clusterMeta[cluster as ConceptCluster].title}
                  </text>
                </g>
              ))}

              {/* Edges */}
              {filteredEdges.map((edge, i) => {
                const from = nodeMap.get(edge.from);
                const to = nodeMap.get(edge.to);
                if (!from || !to) return null;

                const isHighlighted = hoveredNode
                  ? connectedToHovered.has(edge.from) && connectedToHovered.has(edge.to)
                  : false;
                const isDimmed = hoveredNode && !isHighlighted;

                return (
                  <line
                    key={`${edge.from}-${edge.to}-${i}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isHighlighted ? clusterColors[from.cluster] : "hsl(var(--border))"}
                    strokeWidth={edge.weight > 1 ? 2 : 1}
                    opacity={isDimmed ? 0.05 : isHighlighted ? 0.8 : 0.15}
                    className="transition-opacity duration-200"
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const visible = isVisible(node.id);
                const isHovered = hoveredNode === node.id;
                const isConnected = connectedToHovered.has(node.id);
                const isDimmed = hoveredNode && !isConnected;
                const radius = 5 + Math.min(node.connections, 10) * 0.8;

                return (
                  <g
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                    opacity={!visible ? 0.15 : isDimmed ? 0.2 : 1}
                    style={{ transition: "opacity 200ms" }}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isHovered ? radius + 3 : radius}
                      fill={clusterColors[node.cluster]}
                      stroke={isHovered ? "hsl(var(--foreground))" : "white"}
                      strokeWidth={isHovered ? 2 : 1.5}
                      style={{ transition: "r 200ms" }}
                    />
                    {(isHovered || isConnected) && (
                      <text
                        x={node.x}
                        y={node.y - radius - 6}
                        textAnchor="middle"
                        className="fill-foreground text-[9px] font-medium pointer-events-none"
                      >
                        {node.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Hover over nodes to see article titles and connections. Node size reflects connection count.
          </div>

          {/* Article list by cluster */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {stats.clusterCounts.map(({ cluster, label, count }) => (
              <div
                key={cluster}
                className="bg-card border border-border rounded-xl p-6"
                style={{ borderLeftColor: clusterColors[cluster], borderLeftWidth: 4 }}
              >
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: clusterColors[cluster] }}
                  />
                  {label}
                  <span className="text-sm font-normal text-muted-foreground">({count} articles)</span>
                </h3>
                <ul className="space-y-1.5">
                  {conceptArticles
                    .filter(a => a.concepts[0] === cluster)
                    .map(a => (
                      <li key={a.slug} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: clusterColors[cluster] }} />
                        <span>
                          {a.shortTitle}
                          {a.concepts.length > 1 && (
                            <span className="ml-1 text-xs opacity-60">
                              (+{a.concepts.slice(1).map(c => clusterMeta[c].title.split(" ")[0]).join(", ")})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InsightsGraph;
