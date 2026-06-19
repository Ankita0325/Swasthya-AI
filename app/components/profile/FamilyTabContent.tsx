// app/components/profile/FamilyTabContent.tsx
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { FamilySimilarityGraph } from './FamilySimilarityGraph';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#0474FC',
  primaryLight: '#E8F1FE',
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

interface FamilyTabContentProps {
  familyData: any;
  onCopyFamilyCode: () => void;
  onShareFamilyCode?: () => void;
  onSetupFamily: () => void;
  membersCount: number;
  familyRiskLevel?: string;
  getRiskColor: (risk: string) => string;
}

export const FamilyTabContent: React.FC<FamilyTabContentProps> = ({
  familyData,
  onCopyFamilyCode,
  onShareFamilyCode,
  onSetupFamily,
  membersCount,
  familyRiskLevel = 'Low',
  getRiskColor,
}) => {
  const viewShotRef = useRef<any>(null);
  const [showSimilarityGraph, setShowSimilarityGraph] = useState(false);

  const handleShare = async () => {
    try {
      if (viewShotRef.current) {
        const uri = await viewShotRef.current.capture();
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri, {
            mimeType: 'image/png',
            dialogTitle: 'Share my Swasthya Family Code',
          });
        }
      }
    } catch (error) {
      console.error('Failed to share family card image:', error);
    }
  };

  if (!familyData) {
    return (
      <View style={styles.noFamilyCard}>
        <Ionicons name="people-outline" size={48} color={COLORS.primary} />
        <Text style={styles.noFamilyTitle}>No Family Yet</Text>
        <Text style={styles.noFamilyText}>
          Create a family or join an existing one to share health data with family members
        </Text>
        <TouchableOpacity
          style={styles.joinFamilyButton}
          activeOpacity={0.8}
          onPress={onSetupFamily}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.joinFamilyButtonGradient}
          >
            <Ionicons name="add-circle" size={20} color="#FFFFFF" />
            <Text style={styles.joinFamilyButtonText}>Set Up Family</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.container}>
        <ViewShot
          ref={viewShotRef}
          options={{ format: 'png', quality: 1.0 }}
          style={styles.viewShotContainer}
        >
          <View style={styles.identityCard}>
            <View style={styles.profileHeader}>
              <View style={styles.profileInfo}>
                <View style={styles.profilePhoto}>
                  <Ionicons name="people" size={26} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.profileName}>
                    {familyData.family_name || 'Your Family'}
                  </Text>
                  <Text style={styles.profileAge}>
                    {membersCount} {membersCount === 1 ? 'Member' : 'Members'} • Code: {familyData.join_code}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.riskBadge,
                  { backgroundColor: getRiskColor(familyRiskLevel) },
                ]}
              >
                <Text style={styles.riskBadgeText}>{familyRiskLevel}</Text>
              </View>
            </View>

            <View style={styles.qrSection}>
              <Text style={styles.qrTitle}>Family QR Code</Text>
              <View style={styles.qrBox}>
                <QRCode
                  value={`SWASTHYA_FAMILY:${familyData.join_code}`}
                  size={120}
                  color="#000000"
                  backgroundColor="#FFFFFF"
                />
              </View>
              <Text style={styles.qrSubtitle}>Scan QR code to join this family</Text>
            </View>
          </View>
        </ViewShot>

        <View style={styles.qrButtons}>
          <TouchableOpacity style={styles.qrButton} onPress={onCopyFamilyCode}>
            <Ionicons name="copy-outline" size={20} color={COLORS.primary} />
            <Text style={styles.qrButtonText}>Copy Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.qrButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color={COLORS.primary} />
            <Text style={styles.qrButtonText}>Share QR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.similarityButton}
        onPress={() => setShowSimilarityGraph(true)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.similarityGradient}
        >
          <Ionicons name="people-circle-outline" size={24} color="#FFFFFF" />
          <View style={styles.similarityTextContainer}>
            <Text style={styles.similarityButtonText}>View Family Health Graph</Text>
            <Text style={styles.similarityButtonSubtext}>
              Track shared symptoms & health patterns
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>

      <Modal visible={showSimilarityGraph} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.modalHeader}
          >
            <TouchableOpacity
              onPress={() => setShowSimilarityGraph(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              <Text style={styles.modalCloseText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>👨‍👩‍👧‍👦 Family Health Graph</Text>
            <TouchableOpacity onPress={() => setShowSimilarityGraph(false)}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </LinearGradient>
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <FamilySimilarityGraph />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  viewShotContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#EEF2FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  identityCard: {
    padding: 20,
    backgroundColor: '#EEF2FF',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profilePhoto: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  profileAge: {
    fontSize: 13,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  riskBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  qrSection: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 20,
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 12,
  },
  qrBox: {
    width: 140,
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  qrSubtitle: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  qrButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    justifyContent: 'center',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  qrButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  noFamilyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  noFamilyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  noFamilyText: {
    fontSize: 13,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  joinFamilyButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  joinFamilyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  joinFamilyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  similarityButton: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#0474FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  similarityGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  similarityTextContainer: {
    flex: 1,
  },
  similarityButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  similarityButtonSubtext: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalCloseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  modalContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
});

export default FamilyTabContent;