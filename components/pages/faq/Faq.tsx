'use client';

import Image from 'next/image';
import { ChangeEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import type { FaqMenuGroup, FaqSection } from './Faq.data';
import {
    companyAddress as fallbackCompanyAddress,
    faqMenuGroups,
    faqSections,
    footerLinks,
    searchKeywords,
} from './Faq.data';
import type { FaqData, MajorCategoryData } from '../../../types/Faq';
import type { FooterInfoData, RelatedSite } from '../../../types/Footer';
import * as S from '../../../styles/pages/faq/Faq';
import { Post } from '../../../service/crud';
import { getPlainTextFromHtml, hasHtmlTag, plainTextToHtml, sanitizeEditorHtml } from '../../../utils/html';

type SearchIconProps = {
    size?: number;
};

type SvgIconProps = {
    className?: string;
};

type MenuContentProps = {
    menuGroups: FaqMenuGroup[];
    selectedMenuId: string;
    onMenuClick: (menuId: string) => void;
};

type FaqProps = {
    faqData?: MajorCategoryData[];
    footerInfo?: FooterInfoData | null;
    relatedSites?: RelatedSite[];
    popularKeywords?: string[];
};

type CompanyMetaItem = {
    label: string;
    value: string;
};

type FooterViewModel = {
    companyAddress: {
        name: string;
        address: string;
    };
    companyMeta: CompanyMetaItem[];
    footerPhoneNumber: string;
    copyright: string;
    relatedSites: RelatedSite[];
};

const KAKAO_INQUIRY_URL = 'http://pf.kakao.com/_VKxajX/chat';

const SearchIcon = ({ size = 28 }: SearchIconProps) => (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true">
        <path
            d="M24.1616 22.505L20.195 18.55C21.4749 16.9196 22.1693 14.9061 22.1666 12.8333C22.1666 10.9874 21.6192 9.18288 20.5937 7.64802C19.5682 6.11315 18.1105 4.91688 16.4051 4.21046C14.6996 3.50404 12.823 3.31922 11.0125 3.67934C9.202 4.03947 7.53896 4.92838 6.23367 6.23367C4.92838 7.53896 4.03947 9.202 3.67934 11.0125C3.31922 12.823 3.50404 14.6996 4.21046 16.4051C4.91688 18.1105 6.11315 19.5682 7.64802 20.5937C9.18288 21.6192 10.9874 22.1666 12.8333 22.1666C14.9061 22.1693 16.9196 21.4749 18.55 20.195L22.505 24.1616C22.6135 24.271 22.7424 24.3578 22.8847 24.417C23.0268 24.4763 23.1794 24.5067 23.3334 24.5067C23.4874 24.5067 23.6398 24.4763 23.7821 24.417C23.9242 24.3578 24.0533 24.271 24.1616 24.1616C24.271 24.0533 24.3578 23.9242 24.417 23.7821C24.4763 23.6398 24.5067 23.4874 24.5067 23.3334C24.5067 23.1794 24.4763 23.0268 24.417 22.8847C24.3578 22.7424 24.271 22.6135 24.1616 22.505ZM5.83334 12.8333C5.83334 11.4489 6.24387 10.0955 7.01305 8.94435C7.78222 7.7932 8.87547 6.89599 10.1545 6.36618C11.4336 5.83636 12.8411 5.69775 14.1989 5.96783C15.5568 6.23794 16.8041 6.90462 17.7831 7.88359C18.7621 8.86256 19.4288 10.1098 19.6988 11.4677C19.9689 12.8256 19.8303 14.2331 19.3005 15.5121C18.7706 16.7912 17.8735 17.8844 16.7223 18.6536C15.5712 19.4228 14.2178 19.8334 12.8333 19.8334C10.9768 19.8334 9.19635 19.0959 7.88359 17.7831C6.57083 16.4703 5.83334 14.6899 5.83334 12.8333Z"
            fill="#16B364"
        />
    </svg>
);

const ChevronIcon = ({ className }: SvgIconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"
         aria-hidden="true">
        <path
            d="M16.1015 6.93279C16.4139 6.62039 16.9209 6.62038 17.2333 6.93279C17.5455 7.24522 17.5457 7.75228 17.2333 8.06463L10.5663 14.7306C10.2539 15.043 9.74693 15.043 9.43451 14.7306L2.76849 8.06463C2.45607 7.75221 2.45607 7.24521 2.76849 6.93279C3.08087 6.62061 3.58698 6.62059 3.89935 6.93279L9.99994 13.0344L16.1015 6.93279Z"
            fill="#8D99A8"
        />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
            d="M9.3464 11.6664C8.83807 11.6664 8.12401 11.4826 7.05473 10.8852C5.75447 10.156 4.74874 9.48283 3.45552 8.19299C2.20864 6.94689 1.60187 6.14012 0.752651 4.59481C-0.206724 2.85002 -0.0431823 1.93544 0.13963 1.54455C0.357339 1.07736 0.678693 0.797935 1.09406 0.520592C1.32998 0.366018 1.57965 0.233513 1.83989 0.124758C1.86593 0.11356 1.89015 0.102883 1.91177 0.093248C2.04067 0.035175 2.23598 -0.0525854 2.48338 0.0411646C2.64848 0.103144 2.79588 0.229967 3.02661 0.457831C3.49979 0.924498 4.1464 1.96382 4.38494 2.47424C4.5451 2.81825 4.65109 3.04533 4.65135 3.30002C4.65135 3.5982 4.50135 3.82814 4.31932 4.07632C4.2852 4.12294 4.25135 4.16747 4.21854 4.2107C4.02036 4.47111 3.97687 4.54637 4.00552 4.68075C4.06359 4.9508 4.49666 5.75471 5.20838 6.46486C5.9201 7.17502 6.70083 7.58075 6.97192 7.63856C7.11203 7.66851 7.18885 7.6232 7.4576 7.41799C7.49614 7.38856 7.53572 7.35809 7.57713 7.32762C7.85473 7.12111 8.07401 6.97502 8.36515 6.97502H8.36671C8.6201 6.97502 8.83703 7.08491 9.1964 7.26616C9.66515 7.50262 10.7357 8.1409 11.2053 8.6146C11.4336 8.84481 11.561 8.99169 11.6232 9.15653C11.717 9.40471 11.6287 9.59924 11.5711 9.72945C11.5615 9.75106 11.5508 9.77476 11.5396 9.80106C11.43 10.0608 11.2967 10.31 11.1415 10.5453C10.8646 10.9594 10.5842 11.28 10.1159 11.4979C9.8755 11.6117 9.61236 11.6693 9.3464 11.6664Z"
            fill="#16B364"
        />
    </svg>
);

const KakaoIcon = ({ className }: SvgIconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="32" height="31" viewBox="0 0 32 31" fill="none"
         aria-hidden="true">
        <path
            d="M16 1.9C7.7 1.9 1 7.2 1 13.7c0 4.1 2.7 7.7 6.9 9.8l-1.1 4.2c-0.1 0.4 0.3 0.7 0.7 0.5l5.1-3.4c1.1 0.2 2.2 0.4 3.4 0.4 8.3 0 15-5.3 15-11.8S24.3 1.9 16 1.9Z"
            fill="#000000"
        />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7H20M4 12H20M4 17H20" stroke="#0F1B2A" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getHighlightedText = (text: string, query: string): ReactNode => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
        return text;
    }

    const parts = text.split(new RegExp(`(${escapeRegExp(trimmedQuery)})`, 'gi'));
    const lowerQuery = trimmedQuery.toLowerCase();

    return parts.map((part, index) => {
        if (!part) {
            return null;
        }

        if (part.toLowerCase() === lowerQuery) {
            return <S.Highlight key={`${part}-${index}`}>{part}</S.Highlight>;
        }

        return part;
    });
};

const getFaqContent = (content: string) => {
    const contentHtml = sanitizeEditorHtml(hasHtmlTag(content) ? content : plainTextToHtml(content));
    const searchText = getPlainTextFromHtml(contentHtml);
    const lines = content
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
    const [answer = '', ...bulletLines] = lines;

    return {
        answer,
        bullets: bulletLines.map((line) => line.replace(/^[-•]\s*/, '')),
        contentHtml,
        searchText,
    };
};

const sortBySortOrder = <T extends { sortOrder: number }>(items: T[] = []) => {
    return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
};

const sortFaqs = (items: FaqData[] = []) => {
    return [...items].sort((a, b) => {
        if (a.sortOrder !== null && b.sortOrder !== null) {
            return a.sortOrder - b.sortOrder;
        }

        return a.faqId.localeCompare(b.faqId, undefined, { numeric: true });
    });
};

const getVisibleMinorCategories = (majorCategory: MajorCategoryData) => {
    return sortBySortOrder(majorCategory.minorCategories ?? []).filter((minorCategory) => minorCategory.useYn === 'Y');
};

const createFaqSections = (faqData?: MajorCategoryData[]): FaqSection[] => {
    if (!faqData || faqData.length === 0) {
        return faqSections;
    }

    return sortBySortOrder(faqData)
        .filter((majorCategory) => majorCategory.useYn === 'Y')
        .flatMap((majorCategory) =>
            getVisibleMinorCategories(majorCategory).map((minorCategory) => ({
                id: minorCategory.minorCode,
                title: minorCategory.minorName,
                items: sortFaqs(minorCategory.faqs ?? [])
                    .filter((faq) => faq.useYn === 'Y')
                    .map((faq) => {
                        const { answer, bullets, contentHtml, searchText } = getFaqContent(faq.content);

                        return {
                            id: String(faq.faqId),
                            question: faq.title,
                            answer,
                            bullets: bullets.length > 0 ? bullets : undefined,
                            contentHtml,
                            searchText,
                        };
                    }),
            })),
        )
        .filter((section) => section.items.length > 0);
};

const createFaqMenuGroups = (
    faqData: MajorCategoryData[] | undefined,
    hasFaqData: boolean,
): FaqMenuGroup[] => {
    if (!hasFaqData || !faqData) {
        return faqMenuGroups;
    }

    return sortBySortOrder(faqData)
        .filter((majorCategory) => majorCategory.useYn === 'Y')
        .map((majorCategory) => ({
            id: majorCategory.majorCode,
            title: majorCategory.majorName,
            items: getVisibleMinorCategories(majorCategory)
                .map((minorCategory) => ({
                    id: minorCategory.minorCode,
                    label: minorCategory.minorName,
                })),
        }))
        .filter((group) => group.items.length > 0);
};

const getTrimmedValue = (value?: string | null) => value?.trim() ?? '';

const getSearchMatchedSections = (sections: FaqSection[], query: string) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return sections;
    }

    return sections
        .map((section) => ({
            ...section,
            items: section.items.filter((item) => {
                const searchableText = [item.question, item.searchText ?? item.answer, ...(item.bullets ?? [])].join(' ').toLowerCase();

                return searchableText.includes(normalizedQuery);
            }),
        }))
        .filter((section) => section.items.length > 0);
};

const hasSearchResult = (sections: FaqSection[], query: string) => {
    const normalizedQuery = query.trim();

    return normalizedQuery.length > 0 && getSearchMatchedSections(sections, normalizedQuery).length > 0;
};

const createFooterViewModel = (footerInfo?: FooterInfoData | null, relatedSites: RelatedSite[] = []): FooterViewModel => {
    const companyMeta = [
        { label: '대표이사', value: getTrimmedValue(footerInfo?.ceoNm) },
        { label: '사업자등록번호', value: getTrimmedValue(footerInfo?.bizRegNo) },
        { label: '도입문의', value: getTrimmedValue(footerInfo?.phoneNo) },
        { label: '사용문의', value: getTrimmedValue(footerInfo?.helpdeskPhoneNo) },
        { label: '이메일', value: getTrimmedValue(footerInfo?.email) },
    ].filter((item) => item.value);

    return {
        companyAddress: {
            name: fallbackCompanyAddress.name,
            address: getTrimmedValue(footerInfo?.corpAddr),
        },
        companyMeta,
        footerPhoneNumber: getTrimmedValue(footerInfo?.phoneNo),
        copyright: getTrimmedValue(footerInfo?.iprInfo),
        relatedSites,
    };
};

const MenuContent = ({ menuGroups, selectedMenuId, onMenuClick }: MenuContentProps) => (
    <>
        <S.AllMenuButton type="button" $isActive={selectedMenuId === 'all'} onClick={() => onMenuClick('all')}>
            전체
        </S.AllMenuButton>
        <S.MenuScroll>
            {menuGroups.map((group) => (
                <S.MenuGroup key={group.id}>
                    <S.MenuTitle>{group.title}</S.MenuTitle>
                    <S.MenuList>
                        {group.items.map((item) => (
                            <li key={item.id}>
                                <S.MenuButton type="button" $isActive={selectedMenuId === item.id}
                                              onClick={() => onMenuClick(item.id)}>
                                    {item.label}
                                </S.MenuButton>
                            </li>
                        ))}
                    </S.MenuList>
                </S.MenuGroup>
            ))}
        </S.MenuScroll>
    </>
);

const Faq = ({ faqData, footerInfo, relatedSites, popularKeywords }: FaqProps) => {
    const [selectedMenuId, setSelectedMenuId] = useState('all');
    const [openedItemId, setOpenedItemId] = useState('');
    const [isMenuScrolling, setIsMenuScrolling] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isRelatedSitesOpen, setIsRelatedSitesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [submittedSearchQuery, setSubmittedSearchQuery] = useState('');
    const bodyRef = useRef<HTMLElement | null>(null);
    const floatingButtonRef = useRef<HTMLDivElement | null>(null);
    const floatingOffsetRef = useRef(0);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const hasFaqData = Boolean(faqData && faqData.length > 0);
    const sections = useMemo(() => createFaqSections(faqData), [faqData]);
    const menuGroups = useMemo(() => createFaqMenuGroups(faqData, hasFaqData), [faqData, hasFaqData]);
    const visibleSearchKeywords = popularKeywords && popularKeywords.length > 0 ? popularKeywords : searchKeywords;
    const {
        companyAddress,
        companyMeta,
        footerPhoneNumber,
        copyright,
        relatedSites: relatedSiteItems,
    } = useMemo(() => createFooterViewModel(footerInfo, relatedSites), [footerInfo, relatedSites]);

    useEffect(() => {
        if (!isMobileMenuOpen) {
            return;
        }

        const html = document.documentElement;
        const body = document.body;
        const scrollY = window.scrollY;
        const previousHtmlOverflow = html.style.overflow;
        const previousBodyOverflow = body.style.overflow;
        const previousBodyPosition = body.style.position;
        const previousBodyTop = body.style.top;
        const previousBodyWidth = body.style.width;

        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
        mobileMenuRef.current?.scrollTo({ top: 0 });

        return () => {
            html.style.overflow = previousHtmlOverflow;
            body.style.overflow = previousBodyOverflow;
            body.style.position = previousBodyPosition;
            body.style.top = previousBodyTop;
            body.style.width = previousBodyWidth;
            window.scrollTo(0, scrollY);
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        let animationFrame = 0;

        const updateFloatingOffset = (nextOffset: number) => {
            if (floatingOffsetRef.current === nextOffset) {
                return;
            }

            floatingOffsetRef.current = nextOffset;

            if (floatingButtonRef.current) {
                floatingButtonRef.current.style.transform = nextOffset > 0 ? `translateY(-${nextOffset}px)` : '';
            }
        };

        const updateFloatingPosition = () => {
            animationFrame = 0;
            const body = bodyRef.current;

            if (!body) {
                updateFloatingOffset(0);
                return;
            }

            const windowWidth = window.innerWidth;
            const bodyBottom = window.scrollY + body.getBoundingClientRect().bottom;
            const fixedBottomOffset = windowWidth <= 767 ? 40 : windowWidth <= 1232 ? 80 : 24;
            const stoppedBottomOffset = windowWidth <= 767 ? 40 : windowWidth <= 1232 ? 80 : 210;
            const fixedButtonBottom = window.scrollY + window.innerHeight - fixedBottomOffset;
            const stoppedButtonBottom = bodyBottom - stoppedBottomOffset;
            const nextOffset = Math.max(0, Math.ceil(fixedButtonBottom - stoppedButtonBottom));

            updateFloatingOffset(nextOffset);
        };

        const requestFloatingUpdate = () => {
            if (animationFrame) {
                return;
            }

            animationFrame = window.requestAnimationFrame(updateFloatingPosition);
        };

        requestFloatingUpdate();
        window.addEventListener('scroll', requestFloatingUpdate, { passive: true });
        window.addEventListener('resize', requestFloatingUpdate);

        return () => {
            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
            }

            window.removeEventListener('scroll', requestFloatingUpdate);
            window.removeEventListener('resize', requestFloatingUpdate);
        };
    }, []);

    const displayedSections = useMemo(() => getSearchMatchedSections(sections, submittedSearchQuery), [sections, submittedSearchQuery]);

    const savePopularKeyword = (keyword: string) => {
        const trimmedKeyword = keyword.trim();

        if (!hasSearchResult(sections, trimmedKeyword)) {
            return;
        }

        Post('/popular/save', { keyword: trimmedKeyword }, undefined, false);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextSearchQuery = event.target.value;

        setSearchQuery(nextSearchQuery);

        if (nextSearchQuery === '') {
            setSubmittedSearchQuery('');
            setSelectedMenuId('all');
            setOpenedItemId('');
        }
    };

    const handleSearchSubmit = () => {
        const trimmedKeyword = searchQuery.trim();

        setSubmittedSearchQuery(trimmedKeyword);
        setSelectedMenuId('all');
        setOpenedItemId('');
        savePopularKeyword(trimmedKeyword);
    };

    const handleKeywordClick = (keyword: string) => {
        const trimmedKeyword = keyword.trim();

        setSearchQuery(trimmedKeyword);
        setSubmittedSearchQuery(trimmedKeyword);
        setSelectedMenuId('all');
        setOpenedItemId('');
        savePopularKeyword(trimmedKeyword);
    };

    const scrollToSection = (sectionId: string) => {
        requestAnimationFrame(() => {
            sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            requestAnimationFrame(() => {
                setIsMenuScrolling(false);
            });
        });
    };

    const handleMenuClick = (menuId: string) => {
        setSearchQuery('');
        setSubmittedSearchQuery('');
        setIsMobileMenuOpen(false);
        setIsMenuScrolling(true);
        setSelectedMenuId(menuId);

        if (menuId === 'all') {
            setOpenedItemId('');
            const firstSectionId = sections[0]?.id;

            if (firstSectionId) {
                scrollToSection(firstSectionId);
            } else {
                setIsMenuScrolling(false);
            }

            return;
        }

        const firstItem = sections.find((section) => section.id === menuId)?.items[0];
        if (firstItem) {
            setOpenedItemId(firstItem.id);
        }

        scrollToSection(menuId);
    };

    const handleAccordionClick = (itemId: string, sectionId: string) => {
        setSelectedMenuId(sectionId);
        setOpenedItemId((currentId) => (currentId === itemId ? '' : itemId));
    };

    const handleKakaoInquiryClick = () => {
        const inquiryWindow = window.open(KAKAO_INQUIRY_URL, '_blank', 'noopener,noreferrer');

        if (inquiryWindow) {
            inquiryWindow.opener = null;
        }
    };

    return (
        <S.Page>
            <S.Header>
                <S.HeaderLogo href="https://www.bizbee.co.kr/" target="_blank" rel="noreferrer"
                              aria-label="Bizbee Help 홈">
                    <Image src="/assets/images/header-logo.svg" alt="bizbee Help" width={146} height={32} priority />
                </S.HeaderLogo>
                <S.HeaderActions>
                    {/*{userData ? (*/}
                    {/*<S.HeaderButton type="button" $variant="solid" onClick={() => {*/}
                    {/*    router.push('/admin/faqs');*/}
                    {/*}}>*/}
                    {/*    관리자*/}
                    {/*</S.HeaderButton>*/}
                    {/*) : (*/}
                    {/*    // <S.HeaderButton type="button" $variant="line" onClick={() => {*/}
                    {/*    //     router.push('/admin/login');*/}
                    {/*    // }}>*/}
                    {/*    //     로그인*/}
                    {/*    // </S.HeaderButton>*/}
                    {/*)}*/}
                    <S.HeaderButton type="button" $variant="line"
                                    onClick={() => window.open('https://www.bizbee.co.kr')}>
                        비즈비 홈페이지
                    </S.HeaderButton>
                    <S.HeaderButton type="button" $variant="solid"
                                    onClick={() => window.open('https://www.bizbee.co.kr/pages/contact-us.html')}>
                        도입문의
                    </S.HeaderButton>
                </S.HeaderActions>
                <S.HeaderMenuButton
                    type="button"
                    aria-label={isMobileMenuOpen ? 'FAQ 메뉴 닫기' : 'FAQ 메뉴 열기'}
                    aria-expanded={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
                >
                    <MenuIcon />
                </S.HeaderMenuButton>
            </S.Header>

            <S.MobileMenu $isOpen={isMobileMenuOpen} aria-hidden={!isMobileMenuOpen}>
                <S.MobileMenuPanel ref={mobileMenuRef}>
                    <MenuContent menuGroups={menuGroups} selectedMenuId={selectedMenuId}
                                 onMenuClick={handleMenuClick} />
                </S.MobileMenuPanel>
                <S.MobileMenuActionBar>
                    <S.MobileMenuAction type="button" onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.open('https://www.bizbee.co.kr/pages/contact-us.html');
                    }}>
                        도입 문의하기
                    </S.MobileMenuAction>
                </S.MobileMenuActionBar>
            </S.MobileMenu>


            <S.Hero>
                <S.HeroContent>
                    <S.HeroHeading>
                        <S.Title>비즈비에 무엇이든 물어보세요</S.Title>
                        <S.Description>
                            <span>도입 전 궁금한 점부터 운영 중 발생하는 문제까지</span>
                            <span>가장 많이 질문하신 내용을 모았습니다.</span>
                        </S.Description>
                    </S.HeroHeading>
                    <S.SearchGroup>
                        <S.SearchForm
                            role="search"
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleSearchSubmit();
                            }}
                        >
                            <label htmlFor="faq-search">궁금한 내용 검색</label>
                            <S.SearchSubmit type="submit" aria-label="검색">
                                <SearchIcon />
                            </S.SearchSubmit>
                            <input
                                id="faq-search"
                                type="search"
                                name="faq-search-keyword"
                                autoComplete="off"
                                spellCheck={false}
                                placeholder="궁금한 내용을 검색해 보세요."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </S.SearchForm>
                        <S.KeywordList aria-label="추천 검색어">
                            {visibleSearchKeywords.map((keyword) => (
                                <button key={keyword} type="button" onClick={() => handleKeywordClick(keyword)}>
                                    <SearchIcon size={16} />
                                    {keyword}
                                </button>
                            ))}
                        </S.KeywordList>
                    </S.SearchGroup>
                </S.HeroContent>
            </S.Hero>


            <S.Body ref={bodyRef}>
                <S.FloatingButtonLayer ref={floatingButtonRef}>
                    <S.FloatingButton type="button" aria-label="카카오톡 문의하기" onClick={handleKakaoInquiryClick}>
                        <S.FloatingButtonSymbol>
                            <KakaoIcon className="kakao-mark" />
                            <KakaoIcon className="kakao-mark kakao-mark-clone" />
                        </S.FloatingButtonSymbol>
                        <span>
              카카오톡
              <br />
              문의하기
            </span>
                    </S.FloatingButton>
                </S.FloatingButtonLayer>
                <S.BodyInner>
                    <S.SideMenu aria-label="FAQ 분류">
                        <MenuContent menuGroups={menuGroups} selectedMenuId={selectedMenuId}
                                     onMenuClick={handleMenuClick} />
                    </S.SideMenu>

                    <S.Contents>
                        <S.FaqListScroll>
                            {displayedSections.map((section) => (
                                <S.AccordionSection
                                    key={section.id}
                                    id={section.id}
                                    ref={(node) => {
                                        sectionRefs.current[section.id] = node;
                                    }}
                                >
                                    <S.SectionTitle>{section.title}</S.SectionTitle>
                                    <S.AccordionList>
                                        {section.items.map((item) => {
                                            const isOpen = openedItemId === item.id;

                                            return (
                                                <S.AccordionItem key={item.id} $isOpen={isOpen}>
                                                    <S.AccordionButton type="button"
                                                                       onClick={() => handleAccordionClick(item.id, section.id)}
                                                                       aria-expanded={isOpen}>
                                                        <span>{getHighlightedText(item.question, submittedSearchQuery)}</span>
                                                        <S.Chevron as={ChevronIcon} />
                                                    </S.AccordionButton>
                                                    <S.AccordionPanel $isOpen={isOpen} $isInstant={isMenuScrolling}
                                                                      aria-hidden={!isOpen}>
                                                        <S.AccordionPanelInner $isOpen={isOpen}
                                                                               $isInstant={isMenuScrolling}>
                                                            {item.contentHtml ? (
                                                                <S.FaqContentHtml
                                                                    dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                                                                />
                                                            ) : (
                                                                <>
                                                                    <p>{getHighlightedText(item.answer, submittedSearchQuery)}</p>
                                                                    {item.bullets && (
                                                                        <ul>
                                                                            {item.bullets.map((bullet) => (
                                                                                <li key={bullet}>{getHighlightedText(bullet, submittedSearchQuery)}</li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </>
                                                            )}
                                                        </S.AccordionPanelInner>
                                                    </S.AccordionPanel>
                                                </S.AccordionItem>
                                            );
                                        })}
                                    </S.AccordionList>
                                </S.AccordionSection>
                            ))}
                            {displayedSections.length === 0 && (
                                <S.EmptyResult>
                                    <S.EmptyIcon aria-hidden="true">!</S.EmptyIcon>
                                    <p>
                                        <span>검색 결과가 없습니다.</span>
                                        <span>다른 키워드로 검색해 보세요.</span>
                                    </p>
                                </S.EmptyResult>
                            )}
                        </S.FaqListScroll>

                        <S.InfoBox id="contact">
                            <S.InfoText>
                                <h2>원하는 답을 찾지 못하셨나요?</h2>
                                <p>비즈비 전담 컨설턴트가 직접 답변해 드립니다. 지금 바로 문의해 보세요.</p>
                            </S.InfoText>
                            <S.InfoContact>
                                <S.InfoActions>
                                    <S.CallButton type="button">
                                        <PhoneIcon />
                                        1533-5443
                                    </S.CallButton>
                                    <S.InquiryButton type="button"
                                                     onClick={() => window.open('https://www.bizbee.co.kr/pages/contact-us.html')}>
                                        도입 문의하기
                                    </S.InquiryButton>
                                </S.InfoActions>
                                <S.InfoCaption>문의 가능 시간 (주말, 공휴일 제외 09:00 ~ 18:00)</S.InfoCaption>
                            </S.InfoContact>
                        </S.InfoBox>
                    </S.Contents>
                </S.BodyInner>
                <S.FooterTopButton type="button" aria-label="상단으로 이동"
                                   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Image src="/assets/images/footer-arrow-up.svg" alt="" width={36} height={36} aria-hidden="true" />
                </S.FooterTopButton>
            </S.Body>
            <S.Footer>
                <S.FooterTop>
                    <S.FooterLogo href="/faq" aria-label="bizbee">
                        <Image src="/assets/images/footer-logo.svg" alt="bizbee" width={127} height={38} />
                    </S.FooterLogo>
                    <S.FooterLinks aria-label="정책 링크">
                        {footerLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.isExternal ? '_blank' : undefined}
                                rel={link.isExternal ? 'noreferrer' : undefined}
                                aria-current={link.isCurrent ? 'page' : undefined}
                            >
                                {link.label}
                            </a>
                        ))}
                    </S.FooterLinks>
                </S.FooterTop>

                <S.FooterContents>
                    <S.FooterInfoRow>
                        <S.CompanyInfo>
                            <S.CompanyAddress>
                                <strong>{companyAddress.name}</strong>
                                {companyAddress.address ? <span>{companyAddress.address}</span> : null}
                            </S.CompanyAddress>
                            <S.CompanyMetaList>
                                {companyMeta.map((item) => (
                                    <S.CompanyMetaItem key={item.label}>
                                        <strong>{item.label}</strong>
                                        <span>{item.value}</span>
                                    </S.CompanyMetaItem>
                                ))}
                            </S.CompanyMetaList>
                        </S.CompanyInfo>
                        {footerPhoneNumber ? (
                            <S.FooterPhone>
                                <Image src="/assets/images/footer-phone.svg" alt="" width={36} height={36}
                                       aria-hidden="true" />
                                <strong>{footerPhoneNumber}</strong>
                            </S.FooterPhone>
                        ) : null}
                    </S.FooterInfoRow>

                    <S.FooterBottom>
                        {copyright ? <S.Copyright>{copyright}</S.Copyright> : null}
                        {relatedSiteItems.length > 0 ? (
                            <S.RelatedSites
                                onBlur={(event) => {
                                    if (!event.currentTarget.contains(event.relatedTarget)) {
                                        setIsRelatedSitesOpen(false);
                                    }
                                }}
                            >
                                <S.RelatedSitesButton type="button" aria-expanded={isRelatedSitesOpen}
                                                      onClick={() => setIsRelatedSitesOpen((isOpen) => !isOpen)}>
                                    관련 사이트
                                    <Image src="/assets/images/footer-related-plus.svg" alt="" width={16} height={16}
                                           aria-hidden="true" />
                                </S.RelatedSitesButton>
                                <S.RelatedSitesMenu $isOpen={isRelatedSitesOpen}>
                                    {relatedSiteItems.map((site) => (
                                        <li key={site.href}>
                                            <a href={site.href} target="_blank" rel="noreferrer">
                                                {site.label}
                                            </a>
                                        </li>
                                    ))}
                                </S.RelatedSitesMenu>
                            </S.RelatedSites>
                        ) : null}
                    </S.FooterBottom>
                </S.FooterContents>
            </S.Footer>
        </S.Page>
    );
};

export default Faq;

