/**
 * HeroSearch – Vanilla JS widget để nhúng vào bất kỳ trang nào
 * (không phụ thuộc React, dùng được trong email template hoặc landing page tĩnh)
 *
 * Usage:
 *   <div id="momo-hero-search"></div>
 *   <script src="/HeroSearch.js"></script>
 *   <script>MoMoHeroSearch.init('#momo-hero-search')</script>
 */

;(function (global) {
  'use strict'

  const POPULAR_ROUTES = [
    { label: 'HCM → Hà Nội', from: 'SGN', to: 'HAN' },
    { label: 'HCM → Đà Nẵng', from: 'SGN', to: 'DAD' },
    { label: 'HCM → Phú Quốc', from: 'SGN', to: 'PQC' },
    { label: 'Hà Nội → Đà Lạt', from: 'HAN', to: 'DLI' },
  ]

  const TABS = [
    { id: 've-may-bay', label: '✈️ Vé máy bay', href: '/ve-may-bay' },
    { id: 'khach-san', label: '🏨 Khách sạn', href: '/khach-san' },
    { id: 'esim', label: '📡 eSIM', href: '/esim' },
  ]

  function createWidget(container) {
    let activeTab = 've-may-bay'

    function render() {
      container.innerHTML = `
        <div style="font-family: system-ui, sans-serif; max-width: 700px; margin: 0 auto;">
          <!-- Tab buttons -->
          <div style="display: flex; gap: 4px; background: rgba(255,255,255,0.1); padding: 4px; border-radius: 16px; width: fit-content; margin: 0 auto 16px;">
            ${TABS.map(
              (tab) => `
              <button
                data-tab="${tab.id}"
                style="
                  padding: 8px 16px; border-radius: 12px; border: none; cursor: pointer; font-size: 13px; font-weight: 600;
                  background: ${activeTab === tab.id ? '#fff' : 'transparent'};
                  color: ${activeTab === tab.id ? '#2e1065' : 'rgba(255,255,255,0.7)'};
                  transition: all 0.2s;
                "
              >
                ${tab.label}
              </button>
            `
            ).join('')}
          </div>

          <!-- Search box -->
          <div style="background: #fff; border-radius: 20px; padding: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.3);">
            ${renderForm()}
            ${
              activeTab === 've-may-bay'
                ? `
              <div style="margin-top: 12px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span style="font-size: 12px; color: #9ca3af;">Phổ biến:</span>
                ${POPULAR_ROUTES.map(
                  (r) => `
                  <a href="/ve-may-bay?from=${r.from}&to=${r.to}"
                    style="font-size: 12px; color: #6d28d9; background: #f5f3ff; padding: 4px 10px; border-radius: 20px; text-decoration: none; transition: background 0.2s;"
                  >✈️ ${r.label}</a>
                `
                ).join('')}
              </div>
            `
                : ''
            }
          </div>
        </div>
      `

      // Bind tab events
      container.querySelectorAll('[data-tab]').forEach((btn) => {
        btn.addEventListener('click', () => {
          activeTab = btn.dataset.tab
          render()
        })
      })

      // Bind search submit
      const form = container.querySelector('#momo-search-form')
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault()
          const tab = TABS.find((t) => t.id === activeTab)
          if (tab) window.location.href = tab.href
        })
      }
    }

    function renderForm() {
      if (activeTab === 've-may-bay') {
        return `
          <form id="momo-search-form" style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 160px;">
                <label style="display: block; font-size: 11px; font-weight: 700; color: #6b7280; margin-bottom: 6px;">ĐIỂM ĐI</label>
                <input type="text" placeholder="TP. Hồ Chí Minh (SGN)"
                  style="width: 100%; border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 10px 14px; font-size: 13px; outline: none; box-sizing: border-box;"
                />
              </div>
              <div style="flex: 1; min-width: 160px;">
                <label style="display: block; font-size: 11px; font-weight: 700; color: #6b7280; margin-bottom: 6px;">ĐIỂM ĐẾN</label>
                <input type="text" placeholder="Chọn điểm đến..."
                  style="width: 100%; border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 10px 14px; font-size: 13px; outline: none; box-sizing: border-box;"
                />
              </div>
            </div>
            <button type="submit"
              style="background: #6d28d9; color: #fff; border: none; border-radius: 12px; padding: 14px; font-size: 14px; font-weight: 700; cursor: pointer; transition: background 0.2s;"
            >
              🔍 Tìm vé máy bay
            </button>
          </form>
        `
      }

      if (activeTab === 'khach-san') {
        return `
          <form id="momo-search-form" style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label style="display: block; font-size: 11px; font-weight: 700; color: #6b7280; margin-bottom: 6px;">ĐIỂM ĐẾN</label>
              <input type="text" placeholder="Đà Nẵng, Phú Quốc, Bangkok..."
                style="width: 100%; border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 10px 14px; font-size: 13px; outline: none; box-sizing: border-box;"
              />
            </div>
            <button type="submit"
              style="background: #6d28d9; color: #fff; border: none; border-radius: 12px; padding: 14px; font-size: 14px; font-weight: 700; cursor: pointer;"
            >
              🔍 Tìm khách sạn
            </button>
          </form>
        `
      }

      return `
        <form id="momo-search-form" style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <label style="display: block; font-size: 11px; font-weight: 700; color: #6b7280; margin-bottom: 6px;">QUỐC GIA DU LỊCH</label>
            <input type="text" placeholder="Nhật Bản, Hàn Quốc, Thái Lan..."
              style="width: 100%; border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 10px 14px; font-size: 13px; outline: none; box-sizing: border-box;"
            />
          </div>
          <button type="submit"
            style="background: #2563eb; color: #fff; border: none; border-radius: 12px; padding: 14px; font-size: 14px; font-weight: 700; cursor: pointer;"
          >
            📡 Xem gói eSIM
          </button>
        </form>
      `
    }

    render()
  }

  // Public API
  global.MoMoHeroSearch = {
    init: function (selector) {
      const el = typeof selector === 'string' ? document.querySelector(selector) : selector
      if (!el) {
        console.warn('[MoMoHeroSearch] Element not found:', selector)
        return
      }
      createWidget(el)
    },
  }
})(typeof window !== 'undefined' ? window : this)
