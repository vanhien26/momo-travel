// Kiểu dữ liệu cho thư viện lunar-calendar
export interface LunarDate {
  lunarDay: number
  lunarMonth: number
  lunarYear: number
  isLeapMonth: boolean
  heavenlyStem: string   // Can
  earthlyBranch: string  // Chi
  dayName: string
  monthName: string
  yearName: string       // e.g. "Ất Tỵ"
}

export interface SolarToLunar {
  solarDay: number
  solarMonth: number
  solarYear: number
  lunar: LunarDate
}

// Lễ tết và ngày lễ quan trọng
export interface VietnameseFestival {
  name: string
  lunarMonth: number
  lunarDay: number
  description: string
  isPublicHoliday: boolean
}
