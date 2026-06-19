// app/components/profile/FamilySimilarityGraph.tsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Svg, Circle, G, Path, Text as SvgText, Defs, LinearGradient, Stop, Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#0474FC',
  primaryDark: '#0360D0',
  card: '#FFFFFF',
  background: '#F8FAFC',
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    light: '#9CA3AF',
  },
  risk: {
    low: '#10B981',
    moderate: '#F59E0B',
    elevated: '#F97316',
    high: '#EF4444',
  },
};

export const FamilySimilarityGraph = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const panelOpacity = useSharedValue(0);
  const panelScale = useSharedValue(0.95);
  const nodePulse = useSharedValue(1);

  const centerX = SCREEN_WIDTH / 2;
  const centerY = 240;
  const radius = 130;

  const familyNodes = [
    { 
      id: 'indresh', 
      label: 'Indresh', 
      type: 'self', 
      gradientColors: ['#0474FC', '#0360D0'], 
      symptoms: ['Migraine', 'Anxiety', 'Fatigue'], 
      riskScore: 65, 
      healthEvents: ['Fever (Day 1)', 'Fever (Day 3)'], 
      lifestyle: ['Sedentary'] 
    },
    { 
      id: 'father', 
      label: 'Raj Kumar', 
      type: 'father', 
      gradientColors: ['#8B5CF6', '#7C3AED'], 
      symptoms: ['Hypertension', 'Fatigue', 'Diabetes'], 
      riskScore: 85, 
      healthEvents: ['Diabetes Diagnosis'], 
      lifestyle: ['Moderate Exercise'] 
    },
    { 
      id: 'sister', 
      label: 'Priya', 
      type: 'sister', 
      gradientColors: ['#EC4899', '#DB2777'], 
      symptoms: ['Headache', 'Anxiety'], 
      riskScore: 45, 
      healthEvents: ['Migraine Attack'], 
      lifestyle: ['Active'] 
    },
    { 
      id: 'mother', 
      label: 'Sunita', 
      type: 'mother', 
      gradientColors: ['#06B6D4', '#0891B2'], 
      symptoms: ['Arthritis', 'Fatigue'], 
      riskScore: 70, 
      healthEvents: ['Arthritis Diagnosis'], 
      lifestyle: ['Light Exercise'] 
    },
  ];

  const sharedSymptoms = [
    { symptom: 'Anxiety', members: ['indresh', 'sister'], color: COLORS.primary, riskLevel: 'Moderate' },
    { symptom: 'Fatigue', members: ['indresh', 'father', 'mother'], color: '#F59E0B', riskLevel: 'Elevated' },
  ];

  const edges = [
    { source: 'indresh', target: 'sister', symptoms: ['Anxiety'], riskScore: 45 },
    { source: 'indresh', target: 'father', symptoms: ['Fatigue'], riskScore: 75 },
    { source: 'father', target: 'mother', symptoms: ['Fatigue'], riskScore: 60 },
    { source: 'indresh', target: 'mother', symptoms: ['Fatigue'], riskScore: 55 },
  ];

  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) };
  };

  const selectedNodeData = familyNodes.find(n => n.id === selectedNode);

  useEffect(() => {
    if (selectedNode) {
      panelOpacity.value = withTiming(1, { duration: 300 });
      panelScale.value = withSpring(1, { damping: 15, stiffness: 100 });
      nodePulse.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      panelOpacity.value = withTiming(0, { duration: 200 });
      panelScale.value = withTiming(0.95, { duration: 200 });
      nodePulse.value = 1;
    }
  }, [selectedNode]);

  const animatedPanelStyle = useAnimatedStyle(() => ({
    opacity: panelOpacity.value,
    transform: [{ scale: panelScale.value }],
  }));

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: nodePulse.value }],
  }));

  return (
    <View style={styles.graphContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.graphScrollContent}
      >
        <View style={styles.graphWrapper}>
          <Svg width={SCREEN_WIDTH * 1.4} height={500}>
            <Defs>
              {familyNodes.map(node => (
                <LinearGradient 
                  key={`grad-${node.id}`} 
                  id={`grad-${node.id}`} 
                  x1="0%" 
                  y1="0%" 
                  x2="100%" 
                  y2="100%"
                >
                  <Stop offset="0%" stopColor={node.gradientColors[0]} />
                  <Stop offset="100%" stopColor={node.gradientColors[1]} />
                </LinearGradient>
              ))}
              <LinearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.1" />
                <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </LinearGradient>
            </Defs>

            <Circle cx={centerX} cy={centerY} r={radius + 80} fill="url(#glowGrad)" />
            {[0, 1, 2, 3].map(i => (
              <Circle 
                key={`grid-${i}`} 
                cx={centerX} 
                cy={centerY} 
                r={(radius + 80) * ((i + 1) / 4)} 
                stroke="#E5E7EB" 
                strokeWidth="0.5" 
                fill="none" 
                strokeDasharray="4,6" 
              />
            ))}

            {edges.map((edge, index) => {
              const source = familyNodes.find(n => n.id === edge.source);
              const target = familyNodes.find(n => n.id === edge.target);
              if (!source || !target) return null;
              const sourcePos = getNodePosition(familyNodes.indexOf(source), familyNodes.length);
              const targetPos = getNodePosition(familyNodes.indexOf(target), familyNodes.length);
              const isHighlighted = selectedNode === edge.source || selectedNode === edge.target;
              const midX = (sourcePos.x + targetPos.x) / 2;
              const midY = (sourcePos.y + targetPos.y) / 2;
              return (
                <G key={`edge-${index}`}>
                  <Path 
                    d={`M ${sourcePos.x} ${sourcePos.y} Q ${centerX} ${centerY} ${targetPos.x} ${targetPos.y}`} 
                    stroke={isHighlighted ? COLORS.primary : '#CBD5E1'} 
                    strokeWidth={isHighlighted ? 2.5 : 1.5} 
                    fill="none" 
                    strokeDasharray={isHighlighted ? undefined : '5,5'} 
                  />
                  {isHighlighted && edge.symptoms.length > 0 && (
                    <Circle cx={midX} cy={midY - 20} r={4} fill={COLORS.primary} />
                  )}
                </G>
              );
            })}

            {familyNodes.map((node, index) => {
              const pos = getNodePosition(index, familyNodes.length);
              const isSelected = selectedNode === node.id;
              const nodeRadius = node.type === 'self' ? 36 : 28;
              return (
                <G key={node.id} onPress={() => setSelectedNode(isSelected ? null : node.id)}>
                  {isSelected && (
                    <Circle cx={pos.x} cy={pos.y} r={nodeRadius + 12} fill={COLORS.primary} opacity={0.15} />
                  )}
                  <Circle 
                    cx={pos.x} 
                    cy={pos.y} 
                    r={nodeRadius} 
                    fill={`url(#grad-${node.id})`} 
                    stroke={isSelected ? COLORS.primary : '#FFFFFF'} 
                    strokeWidth={isSelected ? 3 : 2} 
                  />
                  <SvgText x={pos.x} y={pos.y + 6} textAnchor="middle" fontSize={16} fontWeight="800" fill="#FFF">
                    {node.label.charAt(0)}
                  </SvgText>
                  <SvgText 
                    x={pos.x} 
                    y={pos.y + nodeRadius + 18} 
                    textAnchor="middle" 
                    fontSize={12} 
                    fontWeight="600" 
                    fill={isSelected ? COLORS.primary : COLORS.text.secondary}
                  >
                    {node.label}
                  </SvgText>
                  <SvgText x={pos.x} y={pos.y + nodeRadius + 32} textAnchor="middle" fontSize={10} fill={COLORS.text.light}>
                    {node.type}
                  </SvgText>
                  <Circle 
                    cx={pos.x + nodeRadius + 14} 
                    cy={pos.y - nodeRadius + 14} 
                    r={12} 
                    fill={node.riskScore > 70 ? COLORS.risk.high : node.riskScore > 50 ? COLORS.risk.elevated : COLORS.risk.moderate} 
                    opacity={0.9} 
                    stroke="#FFF" 
                    strokeWidth={1.5} 
                  />
                  <SvgText x={pos.x + nodeRadius + 14} y={pos.y - nodeRadius + 18} textAnchor="middle" fontSize={8} fontWeight="700" fill="#FFF">
                    {node.riskScore}%
                  </SvgText>
                </G>
              );
            })}

            {sharedSymptoms.map((shared, index) => {
              const members = shared.members.map(id => familyNodes.find(n => n.id === id)).filter(Boolean);
              if (members.length < 2) return null;
              const positions = members.map(m => getNodePosition(familyNodes.indexOf(m), familyNodes.length));
              const midX = positions.reduce((sum, p) => sum + p.x, 0) / positions.length;
              const midY = positions.reduce((sum, p) => sum + p.y, 0) / positions.length;
              const isHighlighted = selectedNode && shared.members.includes(selectedNode);
              return (
                <G key={index}>
                  <Circle 
                    cx={midX} 
                    cy={midY} 
                    r={isHighlighted ? 22 : 18} 
                    fill={shared.color} 
                    opacity={isHighlighted ? 0.95 : 0.7} 
                  />
                  <Circle 
                    cx={midX} 
                    cy={midY} 
                    r={isHighlighted ? 28 : 22} 
                    fill="none" 
                    stroke={shared.color} 
                    strokeWidth={1.5} 
                    opacity={isHighlighted ? 0.4 : 0.15} 
                  />
                  <SvgText x={midX} y={midY + 4} textAnchor="middle" fontSize={isHighlighted ? 10 : 8} fontWeight="600" fill="#FFF">
                    {shared.symptom.substring(0, 6)}
                  </SvgText>
                  {isHighlighted && (
                    <SvgText x={midX} y={midY + 18} textAnchor="middle" fontSize={7} fill="#FFF" opacity={0.8}>
                      {shared.riskLevel}
                    </SvgText>
                  )}
                </G>
              );
            })}
          </Svg>
        </View>
      </ScrollView>

      {selectedNodeData && (
        <Animated.View style={[styles.detailsPanel, animatedPanelStyle]}>
          <ExpoLinearGradient
            colors={selectedNodeData.gradientColors as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.detailsGradient}
          >
            <View style={styles.detailsHeader}>
              <View style={styles.detailsIcon}>
                <Text style={styles.detailsInitial}>{selectedNodeData.label.charAt(0)}</Text>
              </View>
              <View style={styles.detailsInfo}>
                <Text style={styles.detailsTitle}>{selectedNodeData.label}</Text>
                <Text style={styles.detailsType}>{selectedNodeData.type}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedNode(null)} style={styles.detailsClose}>
                <Ionicons name="close" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </ExpoLinearGradient>
          
          <View style={styles.detailsBody}>
            <View style={styles.detailsSection}>
              <Text style={styles.detailsSectionTitle}>🩺 Symptoms</Text>
              <View style={styles.detailsTags}>
                {selectedNodeData.symptoms.map((symptom, i) => (
                  <View key={i} style={[styles.detailsTag, { backgroundColor: '#E8F1FE' }]}>
                    <Text style={[styles.detailsTagText, { color: COLORS.primary }]}>{symptom}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.detailsSection}>
              <Text style={styles.detailsSectionTitle}>📊 Health Timeline</Text>
              <View style={styles.timelineContainer}>
                {selectedNodeData.healthEvents.map((event, i) => (
                  <View key={i} style={styles.timelineItem}>
                    <View style={[styles.timelineDot, { backgroundColor: COLORS.primary }]} />
                    {i < selectedNodeData.healthEvents.length - 1 && <View style={styles.timelineLine} />}
                    <Text style={styles.timelineText}>{event}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.riskSection}>
              <View style={styles.riskHeader}>
                <Text style={styles.riskLabel}>Health Risk Score</Text>
                <Text style={[styles.riskScore, { color: selectedNodeData.riskScore > 70 ? COLORS.risk.high : selectedNodeData.riskScore > 50 ? COLORS.risk.elevated : COLORS.risk.moderate }]}>
                  {selectedNodeData.riskScore}%
                </Text>
              </View>
              <View style={styles.riskBar}>
                <Animated.View style={[styles.riskBarFill, { 
                  width: `${selectedNodeData.riskScore}%`, 
                  backgroundColor: selectedNodeData.riskScore > 70 ? COLORS.risk.high : selectedNodeData.riskScore > 50 ? COLORS.risk.elevated : COLORS.risk.moderate 
                }, animatedPulseStyle]} />
              </View>
              <Text style={styles.riskNote}>
                {selectedNodeData.riskScore > 70 ? '⚠️ High risk - Consult a doctor' : 
                 selectedNodeData.riskScore > 50 ? '⚡ Elevated risk - Monitor closely' : 
                 '✅ Low risk - Continue healthy habits'}
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
      <Text style={styles.legendTip}>👆 Tap any family member to view health insights</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  graphContainer: { 
    paddingVertical: 16, 
    backgroundColor: '#F8FAFC', 
    borderRadius: 16, 
    minHeight: 520 
  },
  graphScrollContent: { 
    flexGrow: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  graphWrapper: { 
    paddingHorizontal: 20, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  legendTip: { 
    textAlign: 'center', 
    fontSize: 11, 
    color: COLORS.text.light, 
    paddingVertical: 8, 
    fontStyle: 'italic' 
  },
  detailsPanel: { 
    marginHorizontal: 16, 
    marginTop: 16, 
    backgroundColor: COLORS.card, 
    borderRadius: 16, 
    overflow: 'hidden', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 12, 
    elevation: 6 
  },
  detailsGradient: { padding: 16 },
  detailsHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12 
  },
  detailsIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  detailsInitial: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#FFFFFF' 
  },
  detailsInfo: { flex: 1 },
  detailsTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#FFFFFF' 
  },
  detailsType: { 
    fontSize: 13, 
    color: 'rgba(255,255,255,0.8)' 
  },
  detailsClose: { padding: 4 },
  detailsBody: { padding: 16 },
  detailsSection: { marginBottom: 16 },
  detailsSectionTitle: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: COLORS.text.secondary, 
    marginBottom: 8 
  },
  detailsTags: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 6 
  },
  detailsTag: { 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4 
  },
  detailsTagText: { 
    fontSize: 11, 
    fontWeight: '500' 
  },
  timelineContainer: { paddingLeft: 8 },
  timelineItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 4 
  },
  timelineDot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    marginRight: 10 
  },
  timelineLine: { 
    width: 2, 
    height: 16, 
    backgroundColor: '#E5E7EB', 
    marginLeft: 3, 
    marginRight: 10 
  },
  timelineText: { 
    fontSize: 12, 
    color: COLORS.text.secondary 
  },
  riskSection: { 
    marginTop: 8, 
    padding: 12, 
    backgroundColor: '#F8FAFC', 
    borderRadius: 12 
  },
  riskHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  riskLabel: { 
    fontSize: 13, 
    fontWeight: '500', 
    color: COLORS.text.secondary 
  },
  riskScore: { 
    fontSize: 18, 
    fontWeight: '700' 
  },
  riskBar: { 
    height: 6, 
    backgroundColor: '#E5E7EB', 
    borderRadius: 3, 
    overflow: 'hidden' 
  },
  riskBarFill: { 
    height: '100%', 
    borderRadius: 3 
  },
  riskNote: { 
    fontSize: 11, 
    color: COLORS.text.secondary, 
    marginTop: 8 
  },
});

export default FamilySimilarityGraph;