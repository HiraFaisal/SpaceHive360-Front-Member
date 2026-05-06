"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/home/Navbar"
import { memberApi, authApi, paymentApi, membershipApi } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { 
    CreditCard, MapPin, Calendar, Clock, 
    ArrowRight, Loader2, ShieldCheck, CheckCircle2,
    User, Phone, Mail, Info, Building2, Landmark, 
    Hash, FileText, Upload, AlertCircle
} from "lucide-react"
import ImageWithFallback from "@/components/ui/ImageWithFallback"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { StatusModal } from "@/components/ui/StatusModal"

function CheckoutContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const planId = searchParams.get("id")
    const { user, isAuthenticated } = useAuth()
    
    const [plan, setPlan] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [phone, setPhone] = useState("")
    
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [paymentMethod, setPaymentMethod] = useState("Stripe") // Stripe or BankTransfer
    
    // Bank Transfer Details
    const [bankDetails, setBankDetails] = useState({
        accountTitle: "",
        accountNumber: "",
        ibanNumber: "",
        bankName: ""
    })
    const [screenshot, setScreenshot] = useState<File | null>(null)
    const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)

    // Booking Specific State
    const [bookingTimes, setBookingTimes] = useState<{ from: Date, to: Date }>({
        from: new Date(),
        to: new Date(new Date().getTime() + 60 * 60 * 1000) // Default +1 hour
    })
    const [isFullDay, setIsFullDay] = useState(false)
    const [isRecurring, setIsRecurring] = useState(false)
    const [recurrence, setRecurrence] = useState({
        interval: 1,
        endType: 'Never' as 'Never' | 'After' | 'On',
        endOccurrences: 10,
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
    })
    const [selectedDays, setSelectedDays] = useState<string[]>([])

    // Modal State
    const [modal, setModal] = useState<{
        isOpen: boolean;
        status: 'success' | 'error' | 'loading' | 'pending' | null;
        message: string;
        actionLabel?: string;
        onAction?: () => void;
        showDismiss?: boolean;
    }>({
        isOpen: false,
        status: null,
        message: "",
        showDismiss: true
    })

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
            return
        }

        if (user?.phoneNumber) {
            setPhone(user.phoneNumber)
        }

        async function fetchPlan() {
            try {
                if (planId) {
                    const res = await memberApi.getPlanById(planId)
                    setPlan(res.data.data)
                }
            } catch (error) {
                console.error("Failed to fetch plan:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPlan()
    }, [planId, isAuthenticated, router])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setScreenshot(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setScreenshotPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const data = plan?.plan
    const type = plan?.type
    const cityName = plan?.cityName

    const isDayOfWeekAvailable = (dayName: string) => {
        if (!data?.availableDays) return true;
        let availableDaysList: string[] = [];
        try {
            if (typeof data.availableDays === 'string' && data.availableDays.trim().startsWith('[')) {
                availableDaysList = JSON.parse(data.availableDays);
            } else if (Array.isArray(data.availableDays)) {
                availableDaysList = data.availableDays;
            } else {
                availableDaysList = data.availableDays.split(',').map((d: string) => d.trim());
            }
        } catch (e) {
            availableDaysList = data.availableDays.split(',').map((d: string) => d.trim());
        }
        return availableDaysList.includes(dayName);
    };

    // Helper to check if a day is available for this plan
    const isDayAvailable = (date: Date) => {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        return isDayOfWeekAvailable(dayName);
    };

    const displayAvailableDays = () => {
        if (!data?.availableDays) return "All Days";
        try {
            if (typeof data.availableDays === 'string' && data.availableDays.trim().startsWith('[')) {
                return JSON.parse(data.availableDays).join(', ');
            } else if (Array.isArray(data.availableDays)) {
                return data.availableDays.join(', ');
            }
        } catch (e) {}
        return data.availableDays;
    };

    // Helper to parse TimeSpan string "09:00:00" to Date for min/max time
    const parseTimeSpan = (timeStr: string | null | undefined, referenceDate: Date) => {
        if (!timeStr) return null;
        const parts = timeStr.split(':');
        if (parts.length < 2) return null;
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        const date = new Date(referenceDate);
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const minBookingTime = parseTimeSpan(data?.startTime, bookingTimes.from) || new Date(new Date().setHours(0, 0, 0, 0));
    const maxBookingTime = parseTimeSpan(data?.endTime, bookingTimes.from) || new Date(new Date().setHours(23, 59, 59, 999));

    // Effect to sync times when Full Day is toggled
    useEffect(() => {
        if (isFullDay && data?.startTime && data?.endTime) {
            const start = parseTimeSpan(data.startTime, bookingTimes.from);
            const end = parseTimeSpan(data.endTime, bookingTimes.from);
            if (start && end) {
                setBookingTimes({ from: start, to: end });
            }
        }
    }, [isFullDay, data?.startTime, data?.endTime, bookingTimes.from.toDateString()]);

    // New Simplified Pricing Calculation Logic
    const calculatePricing = () => {
        if (!data) return { subtotal: 0, tax: 0, total: 0, occurrences: 1, duration: 1 };
        
        let occurrencesCount = 1;
        if (isRecurring) {
            if (recurrence.endType === 'After') {
                occurrencesCount = recurrence.endOccurrences;
            } else if (recurrence.endType === 'On') {
                // Calculate how many matching weekdays between start and end
                const start = new Date(bookingTimes.from);
                const end = new Date(recurrence.endDate);
                const targetDay = start.getDay(); // 0 for Sunday, 1 for Monday...
                
                let count = 0;
                let current = new Date(start);
                // Simple loop to count matching weekdays
                while (current <= end) {
                    if (current.getDay() === targetDay) count++;
                    current.setDate(current.getDate() + 1);
                    if (count > 100) break; // Safety break
                }
                occurrencesCount = Math.max(1, count);
            }
        }

        let duration = 1;
        if (data.pricingType === 'per_hour' || data.pricingType === 'hourly') {
            const diffMs = bookingTimes.to.getTime() - bookingTimes.from.getTime();
            duration = Math.max(1, diffMs / (1000 * 60 * 60));
        }

        const basePrice = data.price || 0;
        const subtotal = (basePrice * duration) * occurrencesCount;
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        return { subtotal, tax, total, occurrences: occurrencesCount, duration };
    };

    const { subtotal, tax, total, occurrences, duration } = calculatePricing();

    const selectedWeekday = bookingTimes.from.toLocaleDateString('en-US', { weekday: 'long' });

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <div className="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-400 font-medium text-sm">Preparing checkout...</p>
            </div>
        )
    }

    if (!plan) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Plan not found</h2>
                <button onClick={() => router.push('/explore')} className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold text-sm">Return to Explore</button>
            </div>
        )
    }

    const handleConfirmBooking = async () => {
        if (!user || !plan) return

        if (paymentMethod === "BankTransfer") {
            if (!bankDetails.accountTitle || !bankDetails.accountNumber || !bankDetails.ibanNumber || !bankDetails.bankName || !screenshot) {
                setModal({
                    isOpen: true,
                    status: 'error',
                    message: "Please fill in all bank transfer details and upload a payment screenshot."
                })
                return
            }
        }

        setProcessing(true)

        try {
            if (type === 'Membership') {
                const formData = new FormData()
                formData.append("planId", planId!)
                formData.append("memberUserId", user.userId)
                formData.append("startDate", startDate.toISOString().split('T')[0])
                formData.append("paymentMethod", paymentMethod)
                
                if (paymentMethod === "Stripe") {
                    formData.append("successUrl", `${window.location.origin}/checkout/success`)
                    formData.append("cancelUrl", `${window.location.origin}/checkout/cancel`)
                } else {
                    formData.append("accountTitle", bankDetails.accountTitle)
                    formData.append("accountNumber", bankDetails.accountNumber)
                    formData.append("ibanNumber", bankDetails.ibanNumber)
                    formData.append("bankName", bankDetails.bankName)
                    if (screenshot) {
                        formData.append("paymentScreenshot", screenshot)
                    }
                }

                const res = await membershipApi.purchase(formData)

                if (res.data.success) {
                    if (paymentMethod === "Stripe") {
                        const { checkoutUrl } = res.data.data
                        window.location.href = checkoutUrl
                    } else {
                        router.push('/checkout/success?type=bank')
                    }
                } else {
                    setModal({
                        isOpen: true,
                        status: 'error',
                        message: res.data.message || "Something went wrong while processing your membership.",
                        showDismiss: true
                    })
                }
            } else if (type === 'Booking') {
                const formData = new FormData()
                formData.append("planId", planId!)
                formData.append("memberUserId", user.userId)
                formData.append("paymentMethod", paymentMethod)
                
                formData.append("startTime", bookingTimes.from.toISOString())
                formData.append("endTime", bookingTimes.to.toISOString())
                formData.append("isFullDay", isFullDay.toString())

                formData.append("isRecurring", isRecurring.toString())
                if (isRecurring) {
                    formData.append("recurrenceInterval", "1")
                    formData.append("recurrenceType", "Week")
                    formData.append("endType", recurrence.endType)
                    formData.append("endAfterOccurrences", occurrences.toString())
                    if (recurrence.endType === 'On') {
                        formData.append("recurrenceEndDate", recurrence.endDate.toISOString())
                    }
                    formData.append("selectedDays", selectedWeekday)
                    formData.append("totalAmount", total.toString())
                }

                if (paymentMethod === "Stripe") {
                    formData.append("successUrl", `${window.location.origin}/checkout/success`)
                    formData.append("cancelUrl", `${window.location.origin}/checkout/cancel`)
                } else {
                    formData.append("accountTitle", bankDetails.accountTitle)
                    formData.append("accountNumber", bankDetails.accountNumber)
                    formData.append("ibanNumber", bankDetails.ibanNumber)
                    formData.append("bankName", bankDetails.bankName)
                    if (screenshot) {
                        formData.append("paymentScreenshot", screenshot)
                    }
                }

                const res = await membershipApi.purchaseBooking(formData)

                if (res.data.success) {
                    if (paymentMethod === "Stripe") {
                        const { checkoutUrl } = res.data.data
                        window.location.href = checkoutUrl
                    } else {
                        router.push('/checkout/success?type=bank')
                    }
                } else {
                    setModal({
                        isOpen: true,
                        status: 'error',
                        message: res.data.message || "Something went wrong while processing your booking.",
                        showDismiss: true
                    })
                }
            }
        } catch (error: any) {
            console.error("Purchase error:", error)
            setModal({
                isOpen: true,
                status: 'error',
                message: "An unexpected error occurred. Please check your internet connection and try again."
            })
        } finally {
            setProcessing(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            
            <div className="pt-24 lg:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        {type === 'Membership' && (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Calendar className="w-6 h-6 text-blue-600" />
                                    Selection Details
                                </h2>
                                
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">When would you like to start?</label>
                                    <div className="relative custom-datepicker">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date: Date | null) => date && setStartDate(date)}
                                            minDate={new Date()}
                                            dateFormat="MMMM d, yyyy"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 focus:border-blue-600 transition-all outline-none"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium italic">* Your membership duration will start from this date.</p>
                                </div>
                            </motion.div>
                        )}

                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 }}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <User className="w-6 h-6 text-blue-600" />
                                Your Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="text" 
                                            readOnly
                                            value={user?.fullName || ""}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-900 focus:outline-none cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="email" 
                                            readOnly
                                            value={user?.email || ""}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-900 focus:outline-none cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="tel" 
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter phone number"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 focus:border-blue-600 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {type === 'Booking' && (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8"
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                    Scheduling & Recurrence
                                </h2>

                                <div className="space-y-8">
                                    <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 shadow-sm">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Building2 className="w-24 h-24 text-blue-600" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                                    <Info className="w-4 h-4 text-white" />
                                                </div>
                                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Space Availability</h3>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {displayAvailableDays().split(',').map((day: string) => (
                                                        <span key={day} className="px-3 py-1 rounded-full bg-white/80 border border-blue-200/50 text-[11px] font-bold text-blue-700 shadow-sm">
                                                            {day.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-4 text-xs font-bold text-blue-600/80">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {data?.startTime?.substring(0, 5)} - {data?.endTime?.substring(0, 5)}
                                                    </div>
                                                    <div className="w-1 h-1 rounded-full bg-blue-300" />
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {type} Plan
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Booking Date*</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                                                <DatePicker
                                                    selected={bookingTimes.from}
                                                    onChange={(date: Date | null) => {
                                                        if (date) {
                                                            const newFrom = new Date(date);
                                                            newFrom.setHours(bookingTimes.from.getHours(), bookingTimes.from.getMinutes());
                                                            const newTo = new Date(date);
                                                            newTo.setHours(bookingTimes.to.getHours(), bookingTimes.to.getMinutes());
                                                            setBookingTimes({ from: newFrom, to: newTo });
                                                        }
                                                    }}
                                                    dateFormat="MMMM d, yyyy"
                                                    minDate={new Date()}
                                                    filterDate={isDayAvailable}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 focus:border-blue-600 transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Start Time*</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                                                <DatePicker
                                                    selected={bookingTimes.from}
                                                    onChange={(date: Date | null) => setBookingTimes({ ...bookingTimes, from: date || new Date() })}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    disabled={isFullDay}
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    minTime={minBookingTime}
                                                    maxTime={maxBookingTime}
                                                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 focus:border-blue-600 transition-all outline-none ${isFullDay ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">End Time*</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                                                <DatePicker
                                                    selected={bookingTimes.to}
                                                    onChange={(date: Date | null) => setBookingTimes({ ...bookingTimes, to: date || new Date() })}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    disabled={isFullDay}
                                                    timeIntervals={15}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    minTime={minBookingTime}
                                                    maxTime={maxBookingTime}
                                                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 focus:border-blue-600 transition-all outline-none ${isFullDay ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                                                <Clock className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">Full Day Booking</p>
                                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-tight">Book for the entire working day</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setIsFullDay(!isFullDay)}
                                            className={`w-12 h-6 rounded-full transition-all relative ${isFullDay ? 'bg-blue-600' : 'bg-gray-200'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isFullDay ? 'left-7' : 'left-1'}`} />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div 
                                            onClick={() => setIsRecurring(!isRecurring)}
                                            className="flex items-center gap-3 cursor-pointer group"
                                        >
                                            <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                                                isRecurring ? "bg-blue-600 border-blue-600" : "border-gray-200 group-hover:border-blue-400"
                                            }`}>
                                                {isRecurring && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">Repeat this booking</span>
                                        </div>

                                        <AnimatePresence>
                                            {isRecurring && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-3">
                                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Pattern</label>
                                                                <div className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100">
                                                                    <span className="text-xs font-bold text-blue-700">Weekly on {selectedWeekday}s</span>
                                                                    <span className="text-[10px] text-blue-600/60 font-medium">Derived from start date</span>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Recurrence Limit</label>
                                                                <select 
                                                                    value={recurrence.endType}
                                                                    onChange={(e) => setRecurrence({ ...recurrence, endType: e.target.value as any })}
                                                                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                                                                >
                                                                    <option value="After">Number of occurrences</option>
                                                                    <option value="On">Until specific date</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        {recurrence.endType === 'After' ? (
                                                            <div className="space-y-3">
                                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">How many times?</label>
                                                                <div className="relative">
                                                                    <input 
                                                                        type="number" 
                                                                        min="1"
                                                                        max="52"
                                                                        value={recurrence.endOccurrences}
                                                                        onChange={(e) => setRecurrence({ ...recurrence, endOccurrences: parseInt(e.target.value) || 1 })}
                                                                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                                                                    />
                                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 uppercase">Bookings</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-3">
                                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">End Date</label>
                                                                <div className="relative">
                                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                                                                    <DatePicker
                                                                        selected={recurrence.endDate}
                                                                        onChange={(date: Date | null) => setRecurrence({ ...recurrence, endDate: date || new Date() })}
                                                                        minDate={bookingTimes.from}
                                                                        dateFormat="MMMM d, yyyy"
                                                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 focus:border-blue-600 transition-all outline-none"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-blue-600" />
                                Payment Method
                            </h2>
                            
                            <div className={`grid grid-cols-1 ${type === 'Membership' ? 'md:grid-cols-2' : ''} gap-4 mb-8`}>
                                <button 
                                    onClick={() => setPaymentMethod("Stripe")}
                                    className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between ${
                                        paymentMethod === "Stripe" 
                                        ? "border-blue-600 bg-blue-50/20" 
                                        : "border-gray-100 hover:border-gray-200"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-lg flex items-center justify-center">
                                            <CreditCard className={`w-5 h-5 ${paymentMethod === "Stripe" ? "text-blue-600" : "text-gray-400"}`} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-gray-900">Online Payment</p>
                                            <p className="text-[10px] font-medium text-gray-500 uppercase tracking-tight">Credit Card / Stripe</p>
                                        </div>
                                    </div>
                                    {paymentMethod === "Stripe" && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                                </button>

                                {type === 'Membership' && (
                                    <button 
                                        onClick={() => setPaymentMethod("BankTransfer")}
                                        className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between ${
                                            paymentMethod === "BankTransfer" 
                                            ? "border-blue-600 bg-blue-50/20" 
                                            : "border-gray-100 hover:border-gray-200"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-lg flex items-center justify-center">
                                                <Landmark className={`w-5 h-5 ${paymentMethod === "BankTransfer" ? "text-blue-600" : "text-gray-400"}`} />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-gray-900">Bank Transfer</p>
                                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-tight">Manual Verification</p>
                                            </div>
                                        </div>
                                        {paymentMethod === "BankTransfer" && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                                    </button>
                                )}
                            </div>

                            <AnimatePresence mode="wait">
                                {type === 'Membership' && paymentMethod === "BankTransfer" && (
                                    <motion.div 
                                        key="bank-form"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-6">
                                            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                                                <Info className="w-4 h-4 text-blue-600" />
                                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Enter the details of the manual transfer you performed</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Account Title</label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input 
                                                            type="text" 
                                                            value={bankDetails.accountTitle}
                                                            onChange={(e) => setBankDetails({...bankDetails, accountTitle: e.target.value})}
                                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                                                            placeholder="Account Holder Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Bank Name</label>
                                                    <div className="relative">
                                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input 
                                                            type="text" 
                                                            value={bankDetails.bankName}
                                                            onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                                                            placeholder="e.g. HBL, Standard Chartered"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Account Number</label>
                                                    <div className="relative">
                                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input 
                                                            type="text" 
                                                            value={bankDetails.accountNumber}
                                                            onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                                                            placeholder="Account Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">IBAN Number</label>
                                                    <div className="relative">
                                                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input 
                                                            type="text" 
                                                            value={bankDetails.ibanNumber}
                                                            onChange={(e) => setBankDetails({...bankDetails, ibanNumber: e.target.value})}
                                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-900 outline-none focus:border-blue-600"
                                                            placeholder="PK00 XXXX XXXX XXXX"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Payment Proof (Screenshot)</label>
                                                <div 
                                                    onClick={() => document.getElementById('screenshot-upload')?.click()}
                                                    className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                                                        screenshot ? "border-green-500 bg-green-50/30" : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/30"
                                                    }`}
                                                >
                                                    <input 
                                                        id="screenshot-upload"
                                                        type="file" 
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                    {screenshotPreview ? (
                                                        <div className="relative group">
                                                            <img src={screenshotPreview} alt="Preview" className="h-32 rounded-lg" />
                                                            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Upload className="w-6 h-6 text-white" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                                                                <Upload className="w-5 h-5 text-gray-400" />
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-sm font-bold text-gray-900">Upload Transaction Screenshot</p>
                                                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-tight">Click or drag and drop image</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    <div className="lg:w-[400px]">
                        <div className="sticky top-24 lg:top-32 space-y-4">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-8">Summary</h3>

                                <div className="flex gap-4 mb-8">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                        <ImageWithFallback 
                                            src={data?.images?.[0] || ""} 
                                            alt={data?.name || "Plan"} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{cityName}</p>
                                        <h4 className="text-lg font-black text-gray-900 line-clamp-1">{data?.name}</h4>
                                        <p className="text-xs font-bold text-gray-400 uppercase">{type}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-8 border-t border-gray-50">
                                    <div className="flex justify-between items-center text-sm font-bold">
                                        <span className="text-gray-400 uppercase text-[10px] tracking-widest">
                                            {data?.pricingType === 'per_hour' || data?.pricingType === 'hourly' 
                                                ? `Rate (${duration} hours)` 
                                                : 'Plan Rate'}
                                        </span>
                                        <span className="text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                                    </div>
                                    
                                    {isRecurring && (
                                        <div className="flex justify-between items-center text-sm font-bold">
                                            <span className="text-gray-400 uppercase text-[10px] tracking-widest">Occurrences</span>
                                            <span className="text-blue-600">x {occurrences}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center text-sm font-bold">
                                        <span className="text-gray-400 uppercase text-[10px] tracking-widest">Taxes (10%)</span>
                                        <span className="text-gray-900">Rs. {tax.toLocaleString()}</span>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <span className="text-sm font-black text-gray-900 uppercase">Total Amount</span>
                                        <span className="text-2xl font-black text-gray-900 tracking-tighter">Rs. {total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleConfirmBooking}
                                    disabled={processing}
                                    className="w-full mt-8 py-4 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Confirm & Pay <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <div className="mt-6 flex items-center justify-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure Payment Processing</p>
                                </div>
                            </motion.div>

                            <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 opacity-20">
                                    <Info className="w-24 h-24 rotate-12" />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="font-bold mb-2">Need help?</h4>
                                    <p className="text-xs text-blue-100 mb-6 leading-relaxed">Our support team is available 24/7 for your booking assistance.</p>
                                    <button className="text-xs font-bold px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all">Contact Support</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <StatusModal 
                isOpen={modal.isOpen}
                status={modal.status}
                message={modal.message}
                onClose={() => setModal({ ...modal, isOpen: false })}
                actionLabel={modal.actionLabel}
                onAction={modal.onAction}
                showDismiss={modal.showDismiss}
            />
        </main>
    )
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <div className="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-400 font-medium text-sm">Preparing checkout...</p>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    )
}
