import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ApiErrorAlert from '../common/ApiErrorAlert';
import FloatingBiologyIcons from '../common/FloatingBiologyIcons';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  UserCheck,
  ArrowRight,
  Upload,
  X
} from 'lucide-react';

const Register: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    if (!academicYear) {
      setError('الرجاء اختيار الصف الدراسي');
      return;
    }

    if (!phoneNumber) {
      setError('رقم الهاتف مطلوب');
      return;
    }

    if (!parentPhone) {
      setError('رقم هاتف ولي الأمر مطلوب');
      return;
    }

    if (!userName) {
      setError('اسم المستخدم مطلوب');
      return;
    }

    // Validate phone number format (Egyptian)
    const phoneRegex = /^01[0-9]{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('يرجى إدخال رقم هاتف مصري صحيح');
      return;
    }

    if (!phoneRegex.test(parentPhone)) {
      setError('يرجى إدخال رقم هاتف ولي الأمر صحيح');
      return;
    }

    try {
      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append('UserName', userName);
      formData.append('Email', email);
      formData.append('Password', password);
      formData.append('ConfirmPassword', confirmPassword);
      formData.append('PhoneNumber', phoneNumber);
      formData.append('ParentPhone', parentPhone);
      formData.append('AcademicYear', academicYear);
      
      if (image) {
        formData.append('Image', image);
      }

      const result = await register(formData);

      if (result.success) {
        navigate('/login');
      } else {
        setError(result.error || 'حدث خطأ في إنشاء الحساب');
      }
    } catch (error: any) {
      setError('حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setError('نوع الملف غير مدعوم. يرجى اختيار صورة بصيغة JPG أو PNG');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('حجم الصورة كبير جداً. يرجى اختيار صورة أصغر من 5 ميجابايت');
        return;
      }

      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleRetry = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 font-cairo" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,163,175,0.08)_1px,transparent_0)] bg-[size:20px_20px] opacity-30"></div>
      
      {/* Background Floating Biology Icons */}
      <FloatingBiologyIcons 
        count={20}
        opacity={0.12}
        minSize={40}
        maxSize={60}
      />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Registration Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
            {/* Biology Icons inside the card */}
            <div className="absolute inset-0 pointer-events-none">
              <FloatingBiologyIcons 
                count={8}
                opacity={0.08}
                minSize={20}
                maxSize={35}
                containerClassName="rounded-3xl"
              />
            </div>

            {/* Content with higher z-index */}
            <div className="relative z-10">
              {/* Logo Section */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">منصة د/ كريم أيوب</h2>
                <p className="text-slate-600 text-sm">للتعليم والتفوق</p>
              </div>

              {/* Welcome Text */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">انضم لمنصتنا</h1>
                <p className="text-slate-600">أنشئ حسابك الجديد</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Messages */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Username */}
                <div>
                  <label htmlFor="userName" className="block text-sm font-semibold text-slate-700 mb-2">
                    اسم المستخدم
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                    </div>
                    <input
                      id="userName"
                      name="userName"
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="block w-full pr-10 pl-4 py-3 border border-slate-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-slate-900 placeholder-slate-500 text-sm"
                      placeholder="أدخل اسم المستخدم"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pr-10 pl-4 py-3 border border-slate-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-slate-900 placeholder-slate-500 text-sm"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-700 mb-2">
                    رقم الهاتف
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full pr-10 pl-4 py-3 border border-slate-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-slate-900 placeholder-slate-500 text-sm"
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                </div>

                {/* Parent Phone Number */}
                <div>
                  <label htmlFor="parentPhone" className="block text-sm font-semibold text-slate-700 mb-2">
                    رقم هاتف ولي الأمر
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                    </div>
                    <input
                      id="parentPhone"
                      name="parentPhone"
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="block w-full pr-10 pl-4 py-3 border border-slate-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-slate-900 placeholder-slate-500 text-sm"
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                </div>

                {/* Academic Year */}
                <div>
                  <label htmlFor="academicYear" className="block text-sm font-semibold text-slate-700 mb-2">
                    الصف الدراسي
                  </label>
                  <select
                    id="academicYear"
                    name="academicYear"
                    required
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="block w-full pr-4 pl-4 py-3 border border-slate-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-slate-900 text-sm"
                  >
                    <option value="">اختر الصف الدراسي</option>
                    <option value="Secondary1">الصف الأول الثانوي</option>
                    <option value="Secondary2">الصف الثاني الثانوي</option>
                    <option value="Secondary3">الصف الثالث الثانوي</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pr-10 pl-4 py-3 border border-slate-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-slate-900 placeholder-slate-500 text-sm"
                      placeholder="أدخل كلمة المرور"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pr-10 pl-4 py-3 border border-slate-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 text-slate-900 placeholder-slate-500 text-sm"
                      placeholder="أعد إدخال كلمة المرور"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* ID Document Upload */}
                <div>
                  <label htmlFor="idDocument" className="block text-sm font-semibold text-slate-700 mb-2">
                    صورة البطاقة أو شهادة الميلاد
                  </label>
                  <div className="relative">
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="idDocument" className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-200 group">
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <img
                              src={imagePreview}
                              alt="معاينة الوثيقة"
                              className="w-full h-full object-cover rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-rose-500 group-hover:text-rose-600 transition-colors" />
                            <p className="mb-1 text-sm text-slate-700 font-medium">
                              <span className="font-semibold">اضغط لرفع الصورة</span> أو اسحبها هنا
                            </p>
                            <p className="text-xs text-slate-500">PNG, JPG أو JPEG (أقل من 5MB)</p>
                          </div>
                        )}
                        <input
                          id="idDocument"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    يرجى رفع صورة واضحة لبطاقة الرقم القومي أو شهادة الميلاد للتحقق من الهوية
                  </p>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-2xl"></div>
                    <div className="flex items-center justify-center gap-3 relative z-10">
                      <span className="font-bold text-lg">
                        {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
                      </span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </button>
                </div>
              </form>

              {/* Login Link */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500 font-medium">لديك حساب بالفعل؟</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center px-6 py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
                  >
                    <User className="w-4 h-4 ml-2 text-rose-600" />
                    تسجيل الدخول
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 