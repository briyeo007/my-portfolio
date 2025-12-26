import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

/**
 * AuthProvider 컴포넌트
 * 사용자 인증 상태를 관리하는 컨텍스트 프로바이더
 *
 * Props:
 * @param {ReactNode} children - 자식 컴포넌트 [Required]
 *
 * Example usage:
 * <AuthProvider><App /></AuthProvider>
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('picstagram_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`nickname.eq.${username},phone.eq.${username}`)
      .eq('password', password)
      .single();

    if (error || !data) {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    setUser(data);
    localStorage.setItem('picstagram_user', JSON.stringify(data));
    return data;
  };

  const signup = async (userData) => {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        phone: userData.phone,
        password: userData.password,
        nickname: userData.nickname,
        name: userData.name,
        birth_date: userData.birthDate,
        gender: userData.gender,
      }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error('이미 사용 중인 닉네임 또는 전화번호입니다.');
      }
      throw new Error('회원가입에 실패했습니다.');
    }

    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('picstagram_user');
  };

  const updateProfile = async (updates) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('users')
      .update({
        name: updates.name,
        nickname: updates.username,
        bio: updates.bio,
        gender: updates.gender,
        profile_image: updates.profile_image,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      throw new Error('프로필 업데이트에 실패했습니다.');
    }

    setUser(data);
    localStorage.setItem('picstagram_user', JSON.stringify(data));
    return data;
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
