/** @format */

'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRightIcon, EyeIcon, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import * as z from 'zod';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuthStore } from '../../store/authStore';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z
    .string()
    .min(6, { message: 'Kata sandi minimal 6 karakter' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login, loginWithGoogle, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setError(null);
    try {
      const user = await login(data);
      if (user) {
        router.push('/'); // Redirect to homepage or dashboard
      } else {
        setError('Email atau kata sandi salah. Silakan coba lagi.');
      }
    } catch {
      setError('Server Error.');
    }
  };

  const handleSocialLogin = async (
    provider: 'google' | 'facebook'
  ) => {
    setError(null);

    if (provider === 'google') {
      const user = await loginWithGoogle();
      if (user) {
        router.push('/');
      } else {
        setError(
          `Gagal masuk dengan ${provider}. Silakan coba lagi.`
        );
      }
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Masuk ke Akun Anda
            </CardTitle>
            <CardDescription>
              Masuk untuk memesan pempek favorit Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <p className="mb-4 text-center text-sm text-red-600">
                {error}
              </p>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <Label htmlFor="email">Email atau Username</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`mt-1 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  placeholder="Masukkan email atau username Anda"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Lupa Kata Sandi?
                  </Link>
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                  className={`mt-1 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  placeholder="Masukkan kata sandi Anda"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5"
                  aria-label={
                    showPassword
                      ? 'Sembunyikan kata sandi'
                      : 'Tampilkan kata sandi'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    atau masuk dengan
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                >
                  <FcGoogle className="mr-2 h-5 w-5" />
                  Google
                </Button>
              </div>
            </div>
            <div className="mt-6 text-center text-sm">
              Belum memiliki akun?{' '}
              <Link
                href="/register"
                className="font-medium text-yellow-600 hover:text-yellow-500"
              >
                Daftar sekarang
              </Link>
            </div>
            <div className="mt-8">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/checkout/shipping">
                  {' '}
                  {/* Assuming guest checkout proceeds to shipping */}
                  Pesan Tanpa Login{' '}
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
