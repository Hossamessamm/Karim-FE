import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import teacherImage from '../../assets/images/teachers/omar-elkholy2.png';
import ApiErrorAlert from '../common/ApiErrorAlert';
import { Upload, X } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4" dir="rtl">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 relative">
        {/* Left side - Teacher Image */}
        <div className="md:w-1/2 relative h-[400px] md:h-[550px] w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-3xl"></div>
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-[1.02]">
            {/* Loading placeholder */}
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/50 to-transparent opacity-60 z-10"></div>
            
            {/* Image */}
            <img
              src={teacherImage}
              alt="أ/ إبراهيم مجدي"
              className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-700 ease-out"
              style={{
                objectPosition: '50% 20%',
                imageRendering: 'crisp-edges'
              }}
              loading="eager"
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                target.previousElementSibling?.classList.add('opacity-0');
                target.previousElementSibling?.classList.remove('animate-pulse');
              }}
            />

            {/* Content overlay */}
            <div className="absolute bottom-0 right-0 left-0 p-8 z-20 bg-gradient-to-t from-blue-900 to-transparent">
              <div className="transform transition-all duration-300 hover:translate-y-[-5px]">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                  م. محمود الشيخ
                </h2>
                <p className="text-blue-50 text-base md:text-lg opacity-90">
                  انضم إلى مجتمع تعلم التاريخ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg w-full max-w-md mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب</h1>
              <p className="text-gray-600">ابدأ رحلة التعلم اليوم</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <ApiErrorAlert message={error} onRetry={handleRetry} />}

              <div className="space-y-5">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المستخدم
                  </label>
                  <div className="relative">
                    <input
                      id="userName"
                      name="userName"
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="أدخل اسم المستخدم"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    رقم الهاتف
                  </label>
                  <div className="relative">
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    رقم هاتف ولي الأمر
                  </label>
                  <div className="relative">
                    <input
                      id="parentPhone"
                      name="parentPhone"
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="01xxxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
                    الصف الدراسي
                  </label>
                  <div className="relative">
                    <select
                      id="academicYear"
                      name="academicYear"
                      required
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                    >
                      <option value="">اختر صفك الدراسي</option>
                      <option value="0">الصف الأول الثانوي</option>
                      <option value="1">الصف الثاني الثانوي</option>
                      <option value="2">الصف الثالث الثانوي</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="أنشئ كلمة مرور قوية"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="أكد كلمة المرور"
                    />
                  </div>
                </div>

                {/* ID Document Upload */}
                <div>
                  <label htmlFor="idDocument" className="block text-sm font-medium text-gray-700 mb-1">
                    صورة البطاقة أو شهادة الميلاد 
                  </label>
                  <div className="relative">
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="idDocument" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
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
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
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
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
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
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">لديك حساب بالفعل؟</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  تسجيل الدخول
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 