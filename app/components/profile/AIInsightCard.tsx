import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface AIInsightCardProps {
  summaryText?: string;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ summaryText }) => {
  const defaultSummary = 
    "Swasthya's Advanced AI Engine has analyzed your health records, check-in history, and active medications. You are showing excellent adherence rates with stable risk factors. Keep monitoring your vitals daily to receive precise, localized healthcare insights and prevent potential complications.";

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#111827']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <View style={styles.header}>
          <View style={styles.iconBg}>
            <Ionicons name="sparkles" size={20} color="#60A5FA" />
          </View>
          <Text style={styles.title}>AI Insight Summary</Text>
        </View>
        
        <Text style={styles.description}>
          {summaryText || defaultSummary}
        </Text>
        
        <View style={styles.footer}>
          <Ionicons name="shield-checkmark" size={16} color="#34D399" />
          <Text style={styles.footerText}>Complete AI analysis based on your recent activity</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  cardGradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(96, 165, 250, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 22,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  footerText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
});
