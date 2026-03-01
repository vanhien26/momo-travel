/* ══════════════════════════════════════════════
 * JSON-LD SCHEMA GENERATORS – MoMo Travel Hub
 *
 * Entity-Driven SEO Strategy:
 * - Định nghĩa MoMo là FinancialService entity
 * - Liên kết MoMo với các dịch vụ du lịch (Product)
 * - Breadcrumb cho site hierarchy
 * - FAQ schema cho rich snippets
 * - WebSite schema cho sitelinks search box
 *
 * GEO Impact:
 * Structured Data giúp AI Search (Google SGE, Bing Copilot)
 * hiểu context và trích xuất thông tin chính xác hơn.
 * ══════════════════════════════════════════════ */

import { MOMO_ENTITY, SITE_CONFIG } from './constants';
import type { FAQItem, BreadcrumbItem, TravelService } from '@/types';

/**
 * Organization Schema – MoMo Entity Definition
 *
 * Mục đích: Xây dựng Entity trong Knowledge Graph.
 * Google/AI sẽ hiểu MoMo là tổ chức tài chính
 * cung cấp dịch vụ du lịch tại châu Á.
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${MOMO_ENTITY.url}/#organization`,
    name: MOMO_ENTITY.name,
    legalName: MOMO_ENTITY.legalName,
    url: MOMO_ENTITY.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.url}/images/momo-logo.svg`,
      width: 200,
      height: 200,
    },
    sameAs: MOMO_ENTITY.sameAs,
    address: {
      '@type': 'PostalAddress',
      ...MOMO_ENTITY.address,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      ...MOMO_ENTITY.contactPoint,
    },
    /** Liên kết Entity MoMo với ngành dịch vụ tài chính */
    additionalType: 'https://schema.org/FinancialService',
    description:
      'MoMo là ứng dụng tài chính hàng đầu Việt Nam, cung cấp dịch vụ thanh toán quốc tế, SIM du lịch, đặt vé bay và khách sạn tại châu Á.',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 10.7769,
        longitude: 106.7009,
      },
      geoRadius: '5000000', // 5000km – phủ châu Á
    },
  };
}

/**
 * WebSite Schema – Sitelinks Search Box
 * Giúp Google hiển thị search box trong SERP.
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.tagline,
    inLanguage: SITE_CONFIG.language,
    publisher: {
      '@id': `${MOMO_ENTITY.url}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/tim-kiem?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Product Schema Generator – Dịch vụ Du lịch
 *
 * Mỗi dịch vụ (SIM, Vé bay, Khách sạn, Thanh toán)
 * được markup như Product để Google hiểu offerings.
 */
export function generateProductSchema(service: TravelService) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_CONFIG.url}/#${service.id}`,
    name: service.title,
    description: service.description,
    brand: {
      '@id': `${MOMO_ENTITY.url}/#organization`,
    },
    provider: {
      '@id': `${MOMO_ENTITY.url}/#organization`,
    },
    category: 'Travel Services',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'VND',
      seller: {
        '@id': `${MOMO_ENTITY.url}/#organization`,
      },
    },
  };
}

/**
 * Breadcrumb Schema Generator
 * Dynamic breadcrumb cho mọi trang.
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.href}`,
    })),
  };
}

/**
 * FAQ Schema Generator
 *
 * GEO Critical: FAQ schema giúp AI Search trích xuất
 * câu trả lời trực tiếp cho featured snippets và
 * AI Overview panels.
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * WebPage Schema – cho trang chủ Travel Hub
 */
export function generateWebPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_CONFIG.url}/#webpage`,
    name: 'MoMo Travel Hub – Du lịch châu Á, thanh toán thông minh',
    description:
      'Đặt SIM du lịch, vé bay, khách sạn và thanh toán khắp châu Á bằng MoMo. Giá tốt nhất, hoàn tiền đến 5%, eSIM kích hoạt 60 giây.',
    url: SITE_CONFIG.url,
    isPartOf: {
      '@id': `${SITE_CONFIG.url}/#website`,
    },
    about: {
      '@id': `${MOMO_ENTITY.url}/#organization`,
    },
    inLanguage: SITE_CONFIG.language,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.url}/images/og-travel-hub.jpg`,
    },
  };
}

/**
 * Aggregate tất cả schemas thành 1 script tag
 * Sử dụng @graph pattern để gom nhiều schema.
 */
export function generateAllSchemas(faqs: FAQItem[], services: TravelService[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateOrganizationSchema(),
      generateWebSiteSchema(),
      generateWebPageSchema(),
      generateFAQSchema(faqs),
      ...services.map(generateProductSchema),
      generateBreadcrumbSchema([
        { name: 'Trang chủ', href: '/' },
        { name: 'Du lịch', href: '/du-lich' },
      ]),
    ],
  };
}
