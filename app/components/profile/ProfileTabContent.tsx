import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#0474FC',
  primaryLight: '#E8F1FE',
  card: '#FFFFFF',
  text: {
    primary: '#111827',
    secondary: '#6B7280',
  },
  risk: {
    low: '#10B981',
    moderate: '#F59E0B',
    elevated: '#F97316',
    high: '#EF4444',
  },
};

interface ProfileTabContentProps {
  profile: any;
  qrValue: string;
  onShareQR: () => void;
  onSaveQR: () => void;
  getRiskColor: (risk: string) => string;
}

export const ProfileTabContent: React.FC<ProfileTabContentProps> = ({
  profile,
  qrValue,
  onShareQR,
  onSaveQR,
  getRiskColor,
}) => {
  return (
    <View style={styles.identityCard}>
      <View style={styles.profileHeader}>
        <View style={styles.profileInfo}>
          <View style={styles.profilePhoto}>
            <Text style={styles.profilePhotoText}>
              {profile?.name ? profile.name[0] : 'U'}
            </Text>
          </View>
          <View>
            <Text style={styles.profileName}>{profile?.name || 'Patient Name'}</Text>
            <Text style={styles.profileAge}>
              {profile?.age || '--'} years • {profile?.gender || 'Other'}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.riskBadge,
            { backgroundColor: getRiskColor(profile?.risk_level) },
          ]}
        >
          <Text style={styles.riskBadgeText}>{profile?.risk_level || 'Low'}</Text>
        </View>
      </View>

      <View style={styles.qrSection}>
        <Text style={styles.qrTitle}>Your Health ID</Text>
        <View style={styles.qrBox}>
          {profile?.health_id_qr ? (
            <Image
              source={{ uri: profile.health_id_qr }}
              style={{ width: 120, height: 120 }}
            />
          ) : (
            <QRCode
              value={qrValue}
              size={120}
              color="#000000"
              backgroundColor="#FFFFFF"
            />
          )}
        </View>
        {/* Removed the raw Health ID text per user request */}
        <Text style={styles.qrSubtitle}>Scan to access your health summary</Text>
        <View style={styles.qrButtons}>
          <TouchableOpacity style={styles.qrButton} onPress={onShareQR}>
            <Ionicons name="share-outline" size={20} color={COLORS.primary} />
            <Text style={styles.qrButtonText}>Share QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.qrButton} onPress={onSaveQR}>
            <Ionicons name="download-outline" size={20} color={COLORS.primary} />
            <Text style={styles.qrButtonText}>Save QR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  identityCard: {
    backgroundColor: '#ECFDF5',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
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
  profilePhotoText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
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
    marginTop: 8,
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
});
