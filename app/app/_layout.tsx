// app/_layout.tsx
import 'react-native-url-polyfill/auto';
import { Delius_400Regular } from '@expo-google-fonts/delius';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import * as Linking from 'expo-linking';

import { Loader } from '@/components/ui/Loader';
import { getCurrentPatient, getCurrentSession } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';

export default function RootLayout() {
  const setSessionState = useAuthStore((state) => state.setSessionState);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const url = Linking.useURL();

  useEffect(() => {
    const handleDeepLink = async () => {
      if (!url) return;
      
      const parsed = Linking.parse(url);
      let access_token = parsed.queryParams?.access_token;
      let refresh_token = parsed.queryParams?.refresh_token;

      // Fallback parsing for hash fragment parameters or query parameter string
      if (!access_token || !refresh_token) {
        const hash = url.split('#')[1] || url.split('?')[1];
        if (hash) {
          const parts = hash.split('&');
          parts.forEach(part => {
            const [key, val] = part.split('=');
            if (key === 'access_token') access_token = decodeURIComponent(val);
            if (key === 'refresh_token') refresh_token = decodeURIComponent(val);
          });
        }
      }

      if (access_token && refresh_token) {
        const finalAccessToken = Array.isArray(access_token) ? access_token[0] : access_token;
        const finalRefreshToken = Array.isArray(refresh_token) ? refresh_token[0] : refresh_token;

        if (finalAccessToken && finalRefreshToken) {
          try {
            const { supabase } = require('@/config/supabase');
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token: finalAccessToken,
              refresh_token: finalRefreshToken,
            });

            if (sessionError) throw sessionError;

            if (sessionData.user) {
              const { getPatientById } = require('@/services/auth.service');
              let dbPatient = await getPatientById(sessionData.user.id);

              if (!dbPatient) {
                const fullName = sessionData.user.user_metadata?.full_name || sessionData.user.user_metadata?.name || 'User';
                const { error: insertError } = await supabase.from('patients').insert({
                  id: sessionData.user.id,
                  full_name: fullName,
                  email: sessionData.user.email,
                  created_at: new Date().toISOString(),
                });
                if (!insertError) {
                  dbPatient = await getPatientById(sessionData.user.id);
                }
              }

              setSessionState({
                userId: sessionData.user.id,
                patientId: sessionData.user.id,
                phoneNumber: dbPatient?.phone ?? null,
                isLoggedIn: true,
                hasProfile: Boolean(dbPatient?.age && dbPatient?.gender),
                hasFamilyGroup: Boolean(dbPatient?.family_id),
                isHydrated: true,
              });

              router.replace('/');
            }
          } catch (e: any) {
            console.error('Deep link auth error:', e);
          }
        }
      }
    };

    handleDeepLink();
  }, [url, setSessionState]);

  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    Delius_400Regular,
  });

  useEffect(() => {
    let mounted = true;

    const hydrateAuth = async () => {
      try {
        const session = await getCurrentSession();
        if (!mounted) return;

        if (!session) {
          logout();
          setSessionState({ isHydrated: true });
          return;
        }

        const patient = await getCurrentPatient();
        if (!mounted) return;

        setSessionState({
          userId: session.user.id,
          patientId: patient?.id ?? session.user.id,
          phoneNumber: patient?.phone ?? null,
          isLoggedIn: true,
          hasProfile: Boolean(patient?.age && patient?.gender),
          hasFamilyGroup: Boolean(patient?.family_id),
          isHydrated: true,
        });
      } catch {
        if (mounted) {
          logout();
          setSessionState({ isHydrated: true });
        }
      }
    };

    hydrateAuth();

    return () => { mounted = false; };
  }, [logout, setSessionState]);

  if (!loaded) return <Loader text="Loading Swasthya AI..." />;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
