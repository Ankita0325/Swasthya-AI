// app/(tabs)/checkin/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSegments, router } from 'expo-router';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
  Dimensions,
  Modal,
} from 'react-native';
import { BACKEND_URL, API_ENDPOINTS } from '@/config/api';
import { useAuthStore } from '@/store/auth.store';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  Easing,
  useAnimatedProps,
  withRepeat,
  withDecay,
  cancelAnimation,
} from 'react-native-reanimated';
import { Svg, Circle, G, Text as SvgText, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const STATIC_QUESTIONS = [
  { id: '1', question_text: 'How are you feeling today overall?', asked_by: 'ai', created_at: '2026-04-10T08:00:00Z', category: 'general', options: ['😊 Feeling Great', '😐 Okay', '😔 Not Good'] },
  { id: '2', question_text: 'Have you taken your prescribed medications today?', asked_by: 'doctor', created_at: '2026-04-10T09:30:00Z', category: 'medication', options: ['✅ Yes, all taken', '⏳ Some missed', '❌ Not yet'] },
  { id: '3', question_text: 'Are you experiencing any unusual symptoms?', asked_by: 'ai', created_at: '2026-04-10T10:15:00Z', category: 'symptoms', options: ['✅ None', '🟡 Mild', '🟠 Moderate', '🔴 Severe'] },
  { id: '4', question_text: 'How would you rate your sleep quality last night?', asked_by: 'doctor', created_at: '2026-04-09T18:00:00Z', category: 'sleep', options: ['⭐ Excellent', '👍 Good', '👎 Fair', '😴 Poor'] },
  { id: '5', question_text: 'Have you experienced any stress or anxiety today?', asked_by: 'ai', created_at: '2026-04-10T07:00:00Z', category: 'mental', options: ['😌 None', '😟 Mild', '😰 Moderate', '😱 High'] },
];

// Animated Circular Progress Ring Component
const AnimatedProgressRing = ({ progress, size = 120, strokeWidth = 12 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const center = size / 2;

  const animatedStrokeDashoffset = useSharedValue(circumference);
  const rotateValue = useSharedValue(0);

  // Ring rotation animation on mount
  useEffect(() => {
    rotateValue.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
  }, []);

  useEffect(() => {
    animatedStrokeDashoffset.value = withTiming(circumference * (1 - Math.min(progress, 1)), {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const getColor = () => {
    if (progress < 0.3) return '#EF4444';
    if (progress < 0.6) return '#F59E0B';
    if (progress < 0.9) return '#8B5CF6';
    return '#10B981';
  };

  const color = getColor();

  // Glow effect when complete
  const glowOpacity = useSharedValue(0);
  useEffect(() => {
    if (progress >= 1) {
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.05, { duration: 1500, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );
    } else {
      glowOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [progress]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  // Count up animation for percentage
  const [displayPercent, setDisplayPercent] = useState(0);
  useEffect(() => {
    const target = Math.round(progress * 100);
    const duration = 1200;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      setDisplayPercent(Math.round(current));
      if (step >= steps) {
        setDisplayPercent(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [progress]);

  // Rotate animation for the ring
  const rotation = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value * 360}deg` }],
  }));

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[rotation]}>
        <Svg width={size} height={size}>
          <Defs>
            <SvgGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={color} />
              <Stop offset="100%" stopColor={color} stopOpacity={0.6} />
            </SvgGradient>
          </Defs>
          {/* Background Circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={animatedStrokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90, ${center}, ${center})`}
          />
        </Svg>
      </Animated.View>

      {/* Glow behind ring when complete */}
      {progress >= 1 && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: size + 30,
              height: size + 30,
              borderRadius: (size + 30) / 2,
              backgroundColor: '#10B981',
            },
            glowStyle,
          ]}
        />
      )}

      {/* Center Content */}
      <View style={styles.ringCenter}>
        <Text style={styles.progressPercent}>{displayPercent}%</Text>
        <Text style={styles.progressSubtitle}>Complete</Text>
      </View>
    </View>
  );
};

// Skeleton Card Component
const SkeletonCard = ({ index }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 800, easing: Easing.inOut(Easing.sin) }),
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.skeletonCard, animatedStyle]}>
      <View style={styles.skeletonRow}>
        <View style={styles.skeletonTag} />
        <View style={styles.skeletonDate} />
      </View>
      <View style={styles.skeletonText} />
      <View style={styles.skeletonOptions}>
        <View style={styles.skeletonChip} />
        <View style={styles.skeletonChip} />
        <View style={styles.skeletonChip} />
      </View>
    </Animated.View>
  );
};

// Animated Question Card
const AnimatedQuestionCard = ({ question, index, onAnswer, onNotesChange, onToggleNotes, selectedAnswer, notes, isExpanded, total, isVisible }) => {
  const translateY = useSharedValue(30);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withDelay(
        index * 150,
        withSpring(0, { damping: 20, stiffness: 120 })
      );
      opacity.value = withDelay(
        index * 150,
        withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) })
      );
      scale.value = withDelay(
        index * 150,
        withSpring(1, { damping: 20, stiffness: 120 })
      );
    } else {
      translateY.value = withTiming(30, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
      scale.value = withTiming(0.95, { duration: 300 });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleOptionPress = (option: string) => {
    onAnswer(question.id, option);
  };

  const isAI = question.asked_by === 'ai';
  const formattedDate = new Date(question.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.questionCard, animatedStyle]}>
      <View style={styles.questionTagRow}>
        <View style={[styles.questionTag, isAI ? styles.aiTag : styles.doctorTag]}>
          <Ionicons name={isAI ? 'hardware-chip-outline' : 'medkit-outline'} size={14} color={isAI ? '#8B5CF6' : '#059669'} />
          <Text style={[styles.questionTagText, isAI ? styles.aiTagText : styles.doctorTagText]}>
            {isAI ? 'AI Suggested' : 'Doctor Requested'}
          </Text>
        </View>
        <View style={styles.questionDate}>
          <Ionicons name="calendar-outline" size={12} color="#9CA3AF" />
          <Text style={styles.questionDateText}>{formattedDate}</Text>
        </View>
      </View>

      <Text style={styles.questionText}>{question.question_text}</Text>

      <View style={styles.optionsContainer}>
        {question.options.map((option: string) => {
          const isSelected = selectedAnswer === option;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.optionChip, isSelected && styles.optionChipSelected]}
              onPress={() => handleOptionPress(option)}
              activeOpacity={0.7}
            >
              {isSelected && (
                <LinearGradient
                  colors={['#0474FC', '#0360D0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.optionChipGradient}
                />
              )}
              <Text style={[styles.optionChipText, isSelected && styles.optionChipTextSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.notesToggle} onPress={() => onToggleNotes(question.id)} activeOpacity={0.7}>
        <Ionicons name={isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'} size={18} color="#6B7280" />
        <Text style={styles.notesToggleText}>
          {isExpanded ? 'Hide details' : 'Add details (optional)'}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <Animated.View style={styles.notesContainer}>
          <TextInput
            style={styles.notesInput}
            placeholder="e.g., Started feeling this way after lunch..."
            placeholderTextColor="#9CA3AF"
            value={notes}
            onChangeText={(text) => onNotesChange(question.id, text)}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};

// Success Modal Component
const SuccessModal = ({ visible, onClose }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSpring(1, { damping: 15, stiffness: 100 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      scale.value = withTiming(0, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View style={[styles.modalOverlay, overlayStyle]}>
        <Animated.View style={[styles.modalContent, animatedStyle]}>
          <View style={styles.modalIconContainer}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalIconGradient}
            >
              <Ionicons name="checkmark" size={40} color="#FFFFFF" />
            </LinearGradient>
          </View>
          <Text style={styles.modalTitle}>✨ Check-in Complete!</Text>
          <Text style={styles.modalMessage}>
            Your daily health check-in has been recorded successfully. Keep up the great work!
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose} activeOpacity={0.8}>
            <LinearGradient
              colors={['#0474FC', '#0360D0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalButtonGradient}
            >
              <Text style={styles.modalButtonText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default function CheckinScreen() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, { answer: string; notes: string }>>({});
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [visibleQuestions, setVisibleQuestions] = useState<number>(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useAuthStore();
  const scrollViewRef = useRef<ScrollView>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getProgress = useCallback(() => {
    const answered = Object.keys(answers).filter(id => answers[id]?.answer).length;
    return { answered, total: questions.length || 1 };
  }, [answers, questions]);

  const progress = getProgress();
  const progressRatio = progress.answered / progress.total;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}${API_ENDPOINTS.CHECKINS.GENERATE}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patient_id: user?.id || 'demo-patient' }),
        });
        const data = await response.json();
        if (data.questions && data.questions.length > 0) {
          const mapped = data.questions.map((q: any, i: number) => ({
            id: String(i + 1),
            question_text: q.text,
            asked_by: q.pending_question_id ? 'doctor' : 'ai',
            created_at: new Date().toISOString(),
            category: q.expected_data_type || 'general',
            options: ['😊 Feeling Great', '😐 Okay', '😔 Not Good'],
          }));
          setQuestions(mapped);
        } else {
          setQuestions(STATIC_QUESTIONS);
        }
      } catch (error) {
        setQuestions(STATIC_QUESTIONS);
      } finally {
        setLoading(false);
        setTimeout(() => {
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setVisibleQuestions(count);
            if (count >= STATIC_QUESTIONS.length) {
              clearInterval(interval);
            }
          }, 300);
        }, 500);
      }
    };
    fetchQuestions();
  }, [user]);

  const handleAnswer = useCallback((questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: { ...prev[questionId], answer, notes: prev[questionId]?.notes || '' } }));
  }, []);

  const handleNotesChange = useCallback((questionId: string, notes: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: { ...prev[questionId], notes } }));
  }, []);

  const toggleNotes = useCallback((questionId: string) => {
    setExpandedNotes(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  }, []);

  const handleSubmit = useCallback(() => {
    const unansweredQuestions = questions.filter(q => !answers[q.id]?.answer);
    if (unansweredQuestions.length > 0) {
      Alert.alert('Incomplete Check-in', `Please answer ${unansweredQuestions.length} more question(s) before submitting.`, [{ text: 'OK' }]);
      return;
    }
    setShowSuccessModal(true);
  }, [answers, questions]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Greeting */}
        <View style={styles.headerCard}>
          <LinearGradient
            colors={['#0474FC', '#0360D0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <Text style={styles.greeting}>{getGreeting()} 👋</Text>
                <Text style={styles.headerSubtitle}>Ready for today's health check-in?</Text>
              </View>
              <View style={styles.streakBadge}>
                <Ionicons name="flame" size={14} color="#F59E0B" />
                <Text style={styles.streakText}>7</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Progress Section - Hero Ring */}
        <View style={styles.progressSection}>
          <View style={styles.progressCard}>
            {/* Ring Container */}
            <View style={styles.ringContainer}>
              <AnimatedProgressRing
                progress={progressRatio}
                size={120}
                strokeWidth={12}
              />
            </View>

            {/* Progress Details */}
            <View style={styles.progressDetails}>
              <Text style={styles.progressTitle}>
                Today's Check-in
              </Text>

              <Text style={styles.progressCount}>
                {progress.answered} of {progress.total} questions answered
              </Text>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(progressRatio * 100, 100)}%`,
                    },
                  ]}
                />
              </View>

              {progressRatio === 1 ? (
                <View style={styles.successBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color="#10B981"
                  />
                  <Text style={styles.successText}>
                    Ready to submit
                  </Text>
                </View>
              ) : (
                <Text style={styles.remainingText}>
                  {progress.total - progress.answered} questions remaining
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Questions */}
        {loading ? (
          <View style={styles.skeletonContainer}>
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </View>
        ) : (
          <View style={styles.questionsContainer}>
            {questions.map((q, index) => {
              const currentAnswer = answers[q.id]?.answer || '';
              const currentNotes = answers[q.id]?.notes || '';
              const isExpanded = expandedNotes[q.id] || false;
              const isVisible = index < visibleQuestions;

              return (
                <AnimatedQuestionCard
                  key={q.id}
                  question={q}
                  index={index}
                  onAnswer={handleAnswer}
                  onNotesChange={handleNotesChange}
                  onToggleNotes={toggleNotes}
                  selectedAnswer={currentAnswer}
                  notes={currentNotes}
                  isExpanded={isExpanded}
                  total={questions.length}
                  isVisible={isVisible}
                />
              );
            })}
          </View>
        )}

        {/* Submit Button - Inside ScrollView at the end */}
        {!loading && questions.length > 0 && visibleQuestions === questions.length && (
          <TouchableOpacity
            style={[
              styles.submitButton,
              progress.answered !== progress.total && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={progress.answered !== progress.total}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={progress.answered === progress.total ? ['#0474FC', '#0360D0'] : ['#93C5FD', '#93C5FD']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.submitGradient}
            >
              <Text style={styles.submitText}>
                {progress.answered === progress.total ? '✓ Complete Check-in' : `${progress.answered}/${progress.total} Done`}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Bottom spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Success Modal */}
      <SuccessModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setAnswers({});
          setExpandedNotes({});
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 150,
  },

  // Header
  headerCard: {
    marginBottom: 20,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#0474FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  headerGradient: {
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '400',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  streakText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // Progress Section - Hero Ring
  progressSection: {
    marginBottom: 20,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  ringContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  progressPercent: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
  },
  progressSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  progressDetails: {
    width: '100%',
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  progressCount: {
    marginTop: 6,
    fontSize: 14,
    color: '#64748B',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    marginTop: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#0474FC',
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  successText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#10B981',
  },
  remainingText: {
    marginTop: 16,
    fontSize: 13,
    color: '#64748B',
  },

  // Questions
  questionsContainer: {
    gap: 16,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  questionTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  questionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  aiTag: {
    backgroundColor: '#F5F3FF',
  },
  doctorTag: {
    backgroundColor: '#ECFDF5',
  },
  questionTagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  aiTagText: {
    color: '#8B5CF6',
  },
  doctorTagText: {
    color: '#059669',
  },
  questionDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  questionDateText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 14,
    lineHeight: 24,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
    position: 'relative',
  },
  optionChipGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  optionChipSelected: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  optionChipText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  optionChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  notesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  notesToggleText: {
    fontSize: 12,
    color: '#6B7280',
  },
  notesContainer: {
    marginTop: 10,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 12,
    fontSize: 14,
    color: '#111827',
    minHeight: 80,
    backgroundColor: '#F9FAFB',
  },

  // Skeleton
  skeletonContainer: {
    gap: 16,
  },
  skeletonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  skeletonTag: {
    width: 80,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  skeletonDate: {
    width: 60,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  skeletonText: {
    width: '100%',
    height: 20,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginBottom: 14,
  },
  skeletonOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  skeletonChip: {
    width: 80,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
  },

  // Submit Button - Inline (not sticky)
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 8,
    shadowColor: '#0474FC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 20,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 32,
    width: SCREEN_WIDTH * 0.85,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  modalIconContainer: {
    marginBottom: 16,
  },
  modalIconGradient: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButton: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
  },
  modalButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});