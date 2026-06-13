// app/services/auth.service.ts
// ─────────────────────────────────────────────────────────────────────────────
// Pure AsyncStorage auth — no Supabase, no phone OTP required.
// ─────────────────────────────────────────────────────────────────────────────
import AsyncStorage from '@react-native-async-storage/async-storage';

// ── Key constants ─────────────────────────────────────────────────────────────
const KEY_IS_LOGGED_IN       = 'isLoggedIn';
const KEY_JWT_TOKEN          = 'jwt_token';
const KEY_USER_EMAIL         = 'userEmail';
const KEY_USER_NAME          = 'userName';
const KEY_USER_ID            = 'current_user_id';
const KEY_ONBOARDING_DONE    = 'onboardingComplete';
const PROFILE_PREFIX         = 'user_profile_';
const FAMILY_PREFIX          = 'family_';
const FAMILY_MEMBERS_PREFIX  = 'family_members_';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface PatientRecord {
  id: string;
  name: string;
  email?: string | null;
  age: number | null;
  gender: string | null;
  phone: string | null;
  family_id: string | null;
  created_at?: string;
}

export interface FamilyRecord {
  id: string;
  family_name: string | null;
  qr_code: string | null;
  created_by: string | null;
  created_at: string;
  join_code: string | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
export const normalizePhone = (value: string) => value.replace(/\D/g, '').slice(-10);

const generateMockJWT = (email: string): string =>
  `jwt_${email}_${Date.now()}`;

const emailToId = (email: string): string =>
  `user_${email.replace(/[@.]/g, '_')}`;

// ── Sign Up ───────────────────────────────────────────────────────────────────
export const signUp = async (name: string, email: string, password: string): Promise<PatientRecord> => {
  const id = emailToId(email);
  const jwt = generateMockJWT(email);

  const user: PatientRecord = {
    id,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    age: null,
    gender: null,
    phone: null,
    family_id: null,
    created_at: new Date().toISOString(),
  };

  // Persist account record
  await AsyncStorage.multiSet([
    [KEY_IS_LOGGED_IN,    'true'],
    [KEY_JWT_TOKEN,       jwt],
    [KEY_USER_EMAIL,      email.toLowerCase().trim()],
    [KEY_USER_NAME,       name.trim()],
    [KEY_USER_ID,         id],
    [KEY_ONBOARDING_DONE, 'false'],
    [`${PROFILE_PREFIX}${id}`,    JSON.stringify(user)],
    [`${PROFILE_PREFIX}${email.toLowerCase().trim()}`, JSON.stringify(user)],
    // Persist password (hashed in production; here stored plaintext for demo)
    [`pwd_${email.toLowerCase().trim()}`, password],
  ]);

  return user;
};

// ── Sign In ───────────────────────────────────────────────────────────────────
export interface SignInResult {
  success: boolean;
  user?: PatientRecord;
  error?: string;
}

export const signIn = async (email: string, password: string): Promise<SignInResult> => {
  const normalizedEmail = email.toLowerCase().trim();
  const id = emailToId(normalizedEmail);

  // Check stored password
  const storedPassword = await AsyncStorage.getItem(`pwd_${normalizedEmail}`);
  if (storedPassword === null) {
    return { success: false, error: 'Account not found. Please Sign Up first.' };
  }
  if (storedPassword !== password) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }

  // Load profile
  const profileStr = await AsyncStorage.getItem(`${PROFILE_PREFIX}${id}`);
  const user: PatientRecord = profileStr
    ? JSON.parse(profileStr)
    : { id, name: normalizedEmail, email: normalizedEmail, age: null, gender: null, phone: null, family_id: null };

  const jwt = generateMockJWT(normalizedEmail);

  await AsyncStorage.multiSet([
    [KEY_IS_LOGGED_IN, 'true'],
    [KEY_JWT_TOKEN,    jwt],
    [KEY_USER_EMAIL,   normalizedEmail],
    [KEY_USER_NAME,    user.name],
    [KEY_USER_ID,      id],
  ]);

  return { success: true, user };
};

// ── Session ───────────────────────────────────────────────────────────────────
export interface SessionData {
  user: {
    id: string;
    email: string | null;
    phone: string | null;
    is_anonymous: boolean;
    user_metadata: {
      patient_id: string;
      phone: string | null;
    };
  };
}

export const getCurrentSession = async (): Promise<SessionData | null> => {
  const [isLoggedIn, jwt, userId, email] = await Promise.all([
    AsyncStorage.getItem(KEY_IS_LOGGED_IN),
    AsyncStorage.getItem(KEY_JWT_TOKEN),
    AsyncStorage.getItem(KEY_USER_ID),
    AsyncStorage.getItem(KEY_USER_EMAIL),
  ]);

  if (isLoggedIn !== 'true' || !jwt || !userId) return null;

  return {
    user: {
      id: userId,
      email: email,
      phone: null,
      is_anonymous: false,
      user_metadata: {
        patient_id: userId,
        phone: null,
      },
    },
  };
};

export const signOut = async (): Promise<void> => {
  await AsyncStorage.multiRemove([
    KEY_IS_LOGGED_IN,
    KEY_JWT_TOKEN,
    KEY_USER_EMAIL,
    KEY_USER_NAME,
    KEY_USER_ID,
    KEY_ONBOARDING_DONE,
  ]);
};

// ── Patient helpers ───────────────────────────────────────────────────────────
export const getPatientById = async (id: string): Promise<PatientRecord | null> => {
  const str = await AsyncStorage.getItem(`${PROFILE_PREFIX}${id}`);
  return str ? JSON.parse(str) : null;
};

export const getPatientByPhone = async (phone: string): Promise<PatientRecord | null> => {
  const normalized = normalizePhone(phone);
  const str = await AsyncStorage.getItem(`${PROFILE_PREFIX}${normalized}`);
  return str ? JSON.parse(str) : null;
};

export const getCurrentPatient = async (): Promise<PatientRecord | null> => {
  const id = await AsyncStorage.getItem(KEY_USER_ID);
  if (!id) return null;
  return getPatientById(id);
};

export const savePatientProfile = async (input: {
  patientId?: string | null;
  name: string;
  age: number;
  gender: string;
  phone?: string | null;
  familyId?: string | null;
}): Promise<PatientRecord> => {
  const resolvedId = input.patientId ?? (await AsyncStorage.getItem(KEY_USER_ID)) ?? `user_${Date.now()}`;
  const email = await AsyncStorage.getItem(KEY_USER_EMAIL);

  const existing = await getPatientById(resolvedId);

  const payload: PatientRecord = {
    ...existing,
    id: resolvedId,
    name: input.name.trim(),
    age: input.age,
    gender: input.gender,
    phone: input.phone ? normalizePhone(input.phone) : existing?.phone ?? null,
    family_id: input.familyId ?? existing?.family_id ?? null,
    email: email ?? existing?.email ?? null,
  };

  const pairs: [string, string][] = [
    [`${PROFILE_PREFIX}${resolvedId}`, JSON.stringify(payload)],
    [KEY_USER_ID, resolvedId],
  ];
  if (payload.phone) pairs.push([`${PROFILE_PREFIX}${payload.phone}`, JSON.stringify(payload)]);
  await AsyncStorage.multiSet(pairs);

  return payload;
};

export const saveUserSession = async (phone: string, userId: string): Promise<void> => {
  const normalized = phone ? normalizePhone(phone) : '';
  const pairs: [string, string][] = [[KEY_USER_ID, userId]];
  if (normalized) pairs.push(['current_user_phone', normalized]);
  await AsyncStorage.multiSet(pairs);
};

export const ensureUserRowForSession = async (input: {
  userId: string;
  phone: string;
  name?: string;
}): Promise<PatientRecord | null> => {
  const existing = await getPatientById(input.userId);
  if (existing) return existing;

  const user: PatientRecord = {
    id: input.userId,
    name: input.name?.trim() ?? 'User',
    phone: input.phone ? normalizePhone(input.phone) : null,
    age: null,
    gender: null,
    family_id: null,
    created_at: new Date().toISOString(),
  };

  await AsyncStorage.setItem(`${PROFILE_PREFIX}${input.userId}`, JSON.stringify(user));
  return user;
};

export const createPhoneAuthUser = async (phone: string, name?: string): Promise<PatientRecord | null> => {
  const normalized = normalizePhone(phone);
  if (!normalized) return null;
  const id = `user_${normalized}`;
  const user: PatientRecord = {
    id,
    name: name?.trim() ?? 'User',
    phone: normalized,
    age: null,
    gender: null,
    family_id: null,
    created_at: new Date().toISOString(),
  };
  await AsyncStorage.setItem(`${PROFILE_PREFIX}${id}`, JSON.stringify(user));
  await AsyncStorage.setItem(`${PROFILE_PREFIX}${normalized}`, JSON.stringify(user));
  return user;
};

// ── Onboarding flag ───────────────────────────────────────────────────────────
export const markOnboardingComplete = async (): Promise<void> => {
  await AsyncStorage.setItem(KEY_ONBOARDING_DONE, 'true');
};

export const isOnboardingComplete = async (): Promise<boolean> => {
  const val = await AsyncStorage.getItem(KEY_ONBOARDING_DONE);
  return val === 'true';
};

// ── Family helpers (unchanged from before) ────────────────────────────────────
export const createFamilyForPatient = async (familyName: string, patient: PatientRecord) => {
  const joinCode = Math.floor(100000 + Math.random() * 900000).toString();
  const familyId = `family_${joinCode}`;

  const family: FamilyRecord = {
    id: familyId,
    family_name: familyName.trim(),
    qr_code: `SWASTHYA_FAMILY:${joinCode}`,
    created_by: patient.id,
    created_at: new Date().toISOString(),
    join_code: joinCode,
  };

  const updatedPatient = { ...patient, family_id: familyId };
  const memberList = [{ id: `member_${patient.id}`, family_id: familyId, patient_id: patient.id, role: 'admin', patient: updatedPatient }];

  await AsyncStorage.multiSet([
    [`${FAMILY_PREFIX}${joinCode}`, JSON.stringify(family)],
    [`${FAMILY_PREFIX}${familyId}`, JSON.stringify(family)],
    [`${PROFILE_PREFIX}${patient.id}`, JSON.stringify(updatedPatient)],
    [`${FAMILY_MEMBERS_PREFIX}${familyId}`, JSON.stringify(memberList)],
  ]);
  if (patient.phone) await AsyncStorage.setItem(`${PROFILE_PREFIX}${patient.phone}`, JSON.stringify(updatedPatient));

  return { family, joinCode };
};

export const joinFamilyForPatient = async (joinCode: string, patient: PatientRecord) => {
  const normalizedCode = joinCode.trim();
  let familyStr = await AsyncStorage.getItem(`${FAMILY_PREFIX}${normalizedCode}`);

  if (!familyStr) {
    const mockFamilyId = `family_${normalizedCode}`;
    const mockFamily: FamilyRecord = {
      id: mockFamilyId,
      family_name: 'Family',
      qr_code: `SWASTHYA_FAMILY:${normalizedCode}`,
      created_by: 'external-user',
      created_at: new Date().toISOString(),
      join_code: normalizedCode,
    };
    await AsyncStorage.multiSet([
      [`${FAMILY_PREFIX}${normalizedCode}`, JSON.stringify(mockFamily)],
      [`${FAMILY_PREFIX}${mockFamilyId}`, JSON.stringify(mockFamily)],
    ]);
    familyStr = JSON.stringify(mockFamily);
  }

  const family = JSON.parse(familyStr) as FamilyRecord;
  const familyId = family.id;

  const updatedPatient = { ...patient, family_id: familyId };
  await AsyncStorage.setItem(`${PROFILE_PREFIX}${patient.id}`, JSON.stringify(updatedPatient));
  if (patient.phone) await AsyncStorage.setItem(`${PROFILE_PREFIX}${patient.phone}`, JSON.stringify(updatedPatient));

  const memberListStr = await AsyncStorage.getItem(`${FAMILY_MEMBERS_PREFIX}${familyId}`);
  const memberList = memberListStr ? JSON.parse(memberListStr) : [];
  if (!memberList.some((m: any) => m.patient_id === patient.id)) {
    memberList.push({ id: `member_${patient.id}`, family_id: familyId, patient_id: patient.id, role: 'member', patient: updatedPatient });
    await AsyncStorage.setItem(`${FAMILY_MEMBERS_PREFIX}${familyId}`, JSON.stringify(memberList));
  }

  return family;
};

export const getFamilyByPatientId = async (patientId: string): Promise<FamilyRecord | null> => {
  const patient = await getPatientById(patientId);
  if (!patient?.family_id) return null;
  const str = await AsyncStorage.getItem(`${FAMILY_PREFIX}${patient.family_id}`);
  return str ? JSON.parse(str) : null;
};

export const getFamilyMembers = async (familyId: string) => {
  const str = await AsyncStorage.getItem(`${FAMILY_MEMBERS_PREFIX}${familyId}`);
  if (!str) return [];
  return JSON.parse(str);
};

// Legacy OTP stubs (kept to avoid import errors from otp.tsx)
export const generateRandomOTP = (): string => '123456';
export const storeOTPLocally = async (_phone: string, _otp: string): Promise<void> => {};
export const getStoredOTP = async (_phone: string): Promise<string | null> => '123456';
export const clearStoredOTP = async (): Promise<void> => {};
export const getRedirectUrl = (): string => '';
export const signInWithGoogle = async (email?: string, name?: string) => ({
  user: { id: emailToId(email ?? 'user@example.com'), email: email ?? 'user@example.com', name: name ?? 'User' },
});
