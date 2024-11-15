import React from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Auth() {
  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error("Error logging in:", error);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error logging out:", error);
  }

  return (
    <div>
      <button onClick={signInWithGoogle}>Log in with Google</button>
      <button onClick={signOut}>Log out</button>
    </div>
  );
}
