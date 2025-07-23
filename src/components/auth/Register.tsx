import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ApiErrorAlert from '../common/ApiErrorAlert';
import { 
  Upload, 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  GraduationCap, 
  UserCheck,
  Star,
  Sparkles,
  BookOpen
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
      setError('رقم الهاتف يجب أن يكون بالصيغة المصرية (01xxxxxxxxx)');
      return;
    }

    if (!phoneRegex.test(parentPhone)) {
      setError('رقم هاتف ولي الأمر يجب أن يكون بالصيغة المصرية (01xxxxxxxxx)');
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
        // Navigate directly to login page with success message
        navigate('/login', {
          state: {
            registrationSuccess: true,
            message: 'تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.',
            email: email
          }
        });
      } else {
        setError(result.error || 'فشل إنشاء الحساب. الرجاء المحاولة مرة أخرى.');
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.');
    }
  };

  const handleRetry = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300 hover:scale-110">
            <UserCheck className="w-10 h-10 text-white" />
          </div>
          
          {/* Modern Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200/50 mb-4 shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 font-semibold text-sm">انضم لمنصتنا</span>
          </div>
          
          <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              أهلاً بيك
            </span>
            <br />
            <span className="text-gray-800">في منصتنا</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 font-medium">
            التاريخ معانا مضمون
          </p>
          
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-3 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          </div>
          
          {/* Feature Icons */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="flex flex-col items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-xs text-gray-600 font-medium">باقات تعليمية</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <Star className="w-6 h-6 text-yellow-500 mb-2" />
              <span className="text-xs text-gray-600 font-medium">محتوى مميز</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <Sparkles className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-xs text-gray-600 font-medium">تجربة فريدة</span>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/60 relative overflow-hidden max-h-[80vh] overflow-y-auto">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 rounded-2xl"></div>
          
          <div className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <ApiErrorAlert message={error} onRetry={handleRetry} />}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Username */}
                <div>
                  <label htmlFor="userName" className="block text-sm font-semibold text-gray-700 mb-2">
                    اسم المستخدم
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="userName"
                      name="userName"
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="block w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="أدخل اسم المستخدم"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                </div>

                {/* Parent Phone */}
                <div>
                  <label htmlFor="parentPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                    رقم هاتف ولي الأمر
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="parentPhone"
                      name="parentPhone"
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="block w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Year */}
              <div>
                <label htmlFor="academicYear" className="block text-sm font-semibold text-gray-700 mb-2">
                  الصف الدراسي
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <select
                    id="academicYear"
                    name="academicYear"
                    required
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="block w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm"
                  >
                    <option value="">اختر صفك الدراسي</option>
                    <option value="0">الصف الأول الثانوي</option>
                    <option value="1">الصف الثاني الثانوي</option>
                    <option value="2">الصف الثالث الثانوي</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    كلمة المرور
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pr-10 pl-10 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="أنشئ كلمة مرور قوية"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pr-10 pl-10 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm"
                      placeholder="أكد كلمة المرور"
                    />
                  </div>
                </div>
              </div>

              {/* ID Document Upload */}
              <div>
                <label htmlFor="idDocument" className="block text-sm font-semibold text-gray-700 mb-2">
                  صورة البطاقة أو شهادة الميلاد
                </label>
                <div className="relative">
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="idDocument" className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-200 group">
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
                          <Upload className="w-10 h-10 mb-3 text-blue-500 group-hover:text-blue-600 transition-colors" />
                          <p className="mb-2 text-sm text-gray-700 font-medium">
                            <span className="font-semibold">اضغط لرفع الصورة</span> أو اسحبها هنا
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG أو JPEG (أقل من 5MB)</p>
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
                <p className="mt-2 text-xs text-gray-500">
                  يرجى رفع صورة واضحة لبطاقة الرقم القومي أو شهادة الميلاد للتحقق من الهوية
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg shadow-md ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري إنشاء الحساب...
                      </>
                    ) : (
                      'إنشاء الحساب'
                    )}
                  </div>
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">لديك حساب بالفعل؟</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
                >
                  <User className="w-4 h-4 ml-2 text-blue-600" />
                  تسجيل الدخول
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Name */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm font-medium">
            منصة م. محمود الشيخ 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 