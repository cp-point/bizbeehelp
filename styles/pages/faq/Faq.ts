import Link from 'next/link';
import styled, { css } from 'styled-components';

type VariantProps = {
    $variant: 'line' | 'solid';
};

type ActiveProps = {
    $isActive?: boolean;
};

type OpenProps = {
    $isOpen?: boolean;
    $isInstant?: boolean;
};

type MobileMenuProps = {
    $isOpen?: boolean;
};

type DisclosureProps = {
  $isOpen?: boolean;
};

const colors = {
    primaryBlack: '#000000',
    primaryWhite: '#ffffff',
    coolGrayBackground: '#f4f7f9',
    coolGray100: '#eef1f6',
    coolGray150: '#e4e8ee',
    coolGray200: '#cdd3dd',
    coolGray400: '#8d99a8',
    coolGray500: '#7d8998',
    coolGray600: '#414d5c',
    coolGray800: '#0f1b2a',
    green50: '#ecfdf3',
    green100: '#d1fadf',
    greenPrimary: '#16b364',
    green600: '#039855',
};

const sizes = {
    headerHeight: '64px',
    stickyGap: '40px',
};

const visuallyHidden = css`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
`;

export const Page = styled.main`
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-height: 100vh;
    overflow: hidden;
    font-family: var(--font-pretendard), Arial, Helvetica, sans-serif;
    color: ${colors.coolGray800};
    background: ${colors.primaryWhite};

    @media (max-width: 767px) {
        padding-top: 56px;
    }

    button,
    input {
        font-family: inherit;
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 0 0 auto;
    position: sticky;
    top: 0;
    min-height: ${sizes.headerHeight};
    padding: 0 32px;
    border-bottom: 1px solid ${colors.coolGray150};
    background: ${colors.primaryWhite};
    z-index: 10;

    @media (max-width: 767px) {
        position: fixed;
        right: 0;
        left: 0;
        min-height: 56px;
        padding: 0 10px 0 16px;
    }
`;


export const PageScroll = styled.div`
    flex: 1 1 auto;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
    overflow-anchor: none;
`;

export const HeaderLogo = styled(Link)`
    display: inline-flex;
    align-items: center;

    img {
        display: block;
        width: 146px;
        height: 32px;

        @media (max-width: 767px) {
            width: 118px;
            height: 26px;
        }
    }
`;

export const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    @media (max-width: 767px) {
        display: none;
    }
`;

export const HeaderMenuButton = styled.button`
    display: none;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 10px;
    border: 0;
    color: ${colors.coolGray800};
    background: transparent;
    cursor: pointer;

    @media (max-width: 767px) {
        display: inline-flex;
    }

    svg {
        display: block;
        width: 24px;
        height: 24px;
    }
`;

export const HeaderButton = styled.button<VariantProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 100px;
    cursor: pointer;
    transition: background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

    ${(props) =>
            props.$variant === 'line'
                    ? css`
                        border: 2px solid ${colors.greenPrimary};
                        color: ${colors.greenPrimary};
                        background: ${colors.primaryWhite};

                        &:hover {
                            background: ${colors.green50};
                        }
                    `
                    : css`
                        border: 2px solid ${colors.greenPrimary};
                        color: ${colors.primaryWhite};
                        background: ${colors.greenPrimary};

                        &:hover {
                            border-color: ${colors.green600};
                            background: ${colors.green600};
                        }
                    `}
`;

export const MobileMenu = styled.div<MobileMenuProps>`
    display: none;

    @media (max-width: 767px) {
        display: flex;
        position: fixed;
        top: 56px;
        right: 0;
        bottom: 0;
        left: 0;
        flex-direction: column;
        opacity: ${(props) => (props.$isOpen ? 1 : 0)};
        visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
        background: ${colors.primaryWhite};
        overflow: hidden;
        overscroll-behavior: contain;
        pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};
        transform: translateY(${(props) => (props.$isOpen ? '0' : '-8px')});
        transition: opacity 0.18s ease,
        transform 0.18s ease,
        visibility 0s linear ${(props) => (props.$isOpen ? '0s' : '0.18s')};
        z-index: 9;
    }
`;

export const MobileMenuPanel = styled.nav`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    padding: 16px 16px 24px;
    background: ${colors.primaryWhite};
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
`;

export const MobileMenuActionBar = styled.div`
    display: none;

    @media (max-width: 767px) {
        display: flex;
        flex: 0 0 auto;
        padding: 8px 16px 24px;
        background: ${colors.primaryWhite};
    }
`;

export const MobileMenuAction = styled.button`
    display: none;

    @media (max-width: 767px) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 12px 20px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 999px;
        line-height: 1.4;
        text-align: center;
        color: ${colors.primaryWhite};
        border: 0;
        background: ${colors.greenPrimary};
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12),
        0 4px 10px rgba(0, 0, 0, 0.16);
        cursor: pointer;
    }
`;

export const Hero = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    background: linear-gradient(rgba(0, 7, 22, 0.7), rgba(0, 7, 22, 0.7)),
    url('/assets/images/faq-intro-bg.webp') center 60% / cover no-repeat;
    overflow: hidden;

    @media (max-width: 767px) {
        padding: 64px 0;
        background: linear-gradient(rgba(0, 7, 22, 0.7), rgba(0, 7, 22, 0.7)),
        url('/assets/images/faq-intro-bg.webp') center / cover no-repeat;
    }
`;

export const HeroContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: min(900px, calc(100% - 40px));

    @media (max-width: 767px) {
        width: 100%;
    }
`;

export const HeroHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;

  @media (max-width: 767px) {
    padding: 0 16px;
  }
`;

export const Title = styled.h1`
    font-size: 56px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.3;
    text-align: center;
    color: ${colors.primaryWhite};
    white-space: nowrap;

  @media (max-width: 767px) {
    font-size: 28px;
    word-break: keep-all;
    white-space: normal;
  }
`;

export const Description = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.4;
    text-align: center;
    color: ${colors.primaryWhite};

  @media (max-width: 767px) {
    font-size: 15px;
    word-break: keep-all;
    overflow-wrap: break-word;
  }
`;

export const SearchGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;

    @media (max-width: 767px) {
        gap: 24px;
    }
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  width: min(600px, 100%);
  padding: 13px 24px 13px 16px;
  border: 1px solid ${colors.coolGray200};
  border-radius: 100px;
  background: ${colors.primaryWhite};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

    @media (max-width: 767px) {
        width: calc(100% - 32px);
        padding: 11px 24px 11px 16px;
    }

    &:focus-within {
        border-color: ${colors.greenPrimary};
        box-shadow: 0 2px 14px rgba(50, 213, 131, 0.6);
    }

    label {
        ${visuallyHidden}
    }

    input {
        display: block;
        flex: 1;
        min-width: 0;
        padding: 0;
        margin: 0;
        font-size: 18px;
        font-weight: 500;
        border: 0;
        line-height: 28px;
        color: ${colors.coolGray800};
        background: transparent;
        outline: 0;

        &::placeholder {
            line-height: 28px;
            color: ${colors.coolGray400};
        }

        @media (max-width: 767px) {
            font-size: 15px;
            line-height: 24px;

            &::placeholder {
                line-height: 24px;
            }
        }

    &::-webkit-search-cancel-button {
      width: 14px;
      height: 14px;
      appearance: none;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'%3E%3Cpath d='M12.2929 0.292893C12.6834 -0.0976307 13.3156 -0.0976307 13.7062 0.292893C14.0967 0.683416 14.0967 1.31565 13.7062 1.70617L8.41282 6.99953L13.7062 12.2929C14.0967 12.6834 14.0967 13.3156 13.7062 13.7062C13.3156 14.0967 12.6834 14.0967 12.2929 13.7062L6.99953 8.41282L1.70617 13.7062C1.31565 14.0967 0.683416 14.0967 0.292893 13.7062C-0.0976307 13.3156 -0.0976307 12.6834 0.292893 12.2929L5.58625 6.99953L0.292893 1.70617C-0.0976308 1.31565 -0.0976308 0.683416 0.292893 0.292893C0.683416 -0.0976308 1.31565 -0.0976308 1.70617 0.292893L6.99953 5.58625L12.2929 0.292893Z' fill='%238D99A8'/%3E%3C/svg%3E") center / 14px 14px no-repeat;
      cursor: pointer;
    }
  }
`;

export const SearchSubmit = styled.button`
    display: inline-flex;
    flex: 0 0 28px;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    color: ${colors.greenPrimary};
    background: transparent;
    cursor: pointer;
    transition: transform 0.2s ease;

    @media (max-width: 767px) {
        flex-basis: 24px;
        width: 24px;
        height: 24px;
    }

    &:hover {
        transform: scale(1.05);
    }

    svg {
        display: block;
        width: 28px;
        height: 28px;

        @media (max-width: 767px) {
            width: 24px;
            height: 24px;
        }
    }
`;

export const KeywordList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: -4px;

  @media (max-width: 767px) {
    flex-wrap: nowrap;
    justify-content: safe center;
    width: 100%;
    padding: 0 16px;
    margin-top: 0;
    overflow-x: auto;
    scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    button {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 6px 14px 6px 12px;
        font-size: 16px;
        font-weight: 500;
        border: 0;
        border-radius: 99px;
        line-height: 1.4;
        color: ${colors.green600};
        background: ${colors.green50};
        cursor: pointer;
        transition: background-color 0.2s ease,
        transform 0.2s ease;

        @media (max-width: 767px) {
            flex: 0 0 auto;
            padding: 10px 14px 10px 12px;
            font-size: 15px;
            line-height: 1.2;
        }

        &:hover {
            background: ${colors.green100};
            transform: translateY(-1px);
        }

        svg {
            display: block;
            flex: 0 0 16px;
        }
    }
`;

export const Body = styled.section`
    position: relative;
    padding: 40px 0 120px;

  @media (max-width: 767px) {
    padding: 40px 0 0;
  }
`;

export const FloatingButtonLayer = styled.div`
  position: fixed;
  right: 55px;
  bottom: 24px;
  transform: translateY(0);
  z-index: 8;

  @media (max-width: 1232px) {
    right: 24px;
    bottom: 80px;
  }

  @media (max-width: 767px) {
    right: 16px;
    bottom: 40px;
  }
`;

export const FloatingButton = styled.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 8px 20px;
  font-size: 14px;
  font-weight: 500;
  border: 0;
  border-radius: 48px;
  line-height: 1.3;
  text-align: center;
  color: ${colors.coolGray800};
  background: ${colors.primaryWhite};
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 4px 10px rgba(0, 0, 0, 0.16);
  transition: background-color 0.2s ease;
  cursor: pointer;

    &:hover {
        background: ${colors.coolGrayBackground};
    }

  @media (max-width: 767px) {
    gap: 6px;
    padding: 8px 8px 16px;
    font-size: 12px;
  }
`;

export const FloatingButtonSymbol = styled.i`
    display: inline-flex;
    flex: 0 0 64px;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 48px;
    font-style: normal;
    background: #fee500;
    overflow: hidden;

    @media (max-width: 767px) {
        flex-basis: 48px;
        width: 48px;
        height: 48px;
    }

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 32px;
        height: 31px;
        transform: translate(-50%, -50%);
        transition: transform 0.28s ease;

        @media (max-width: 767px) {
            width: 24px;
            height: 23px;
        }
    }

    .kakao-mark-clone {
        transform: translate(-50%, calc(-50% + 64px));

        @media (max-width: 767px) {
            transform: translate(-50%, calc(-50% + 48px));
        }
    }

    ${FloatingButton}:hover & {
        .kakao-mark:not(.kakao-mark-clone) {
            transform: translate(-50%, calc(-50% - 64px));

            @media (max-width: 767px) {
                transform: translate(-50%, calc(-50% - 48px));
            }
        }

        .kakao-mark-clone {
            transform: translate(-50%, -50%);
        }
    }
`;

export const BodyInner = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 40px;
    width: min(1200px, 100%);
    padding: 0 16px;
    margin: 0 auto;

  @media (max-width: 1232px) {
    gap: 24px;
    padding: 0 32px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 0;
  }

  @media (max-width: 479px) {
    padding: 0 16px;
  }
`;

export const SideMenu = styled.aside`
    display: flex;
    flex: 0 0 240px;
    flex-direction: column;
    align-self: flex-start;
    gap: 16px;
    position: sticky;
    top: ${sizes.stickyGap};
    max-height: calc(100vh - 140px);
    padding: 16px 0;
    border: 1px solid ${colors.coolGray200};
    border-radius: 12px;
    background: ${colors.primaryWhite};
    overflow: hidden;

    @media (max-width: 767px) {
        display: none;
    }
`;

export const MenuScroll = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    overflow-y: auto;

    ${MobileMenuPanel} & {
        gap: 16px;
        overflow: visible;
    }
`;

export const AllMenuButton = styled.button<ActiveProps>`
    flex: 0 0 auto;
    width: 100%;
    padding: 10px 16px 22px;
    font-size: 17px;
    font-weight: 600;
    border: 0;
    border-bottom: 1px solid ${colors.coolGray150};
    line-height: 1.4;
    text-align: left;
    color: ${(props) => (props.$isActive ? colors.green600 : colors.coolGray800)};
    background: ${(props) => (props.$isActive ? colors.green100 : colors.primaryWhite)};
    box-shadow: inset 0 -12px 0 ${colors.primaryWhite};
    cursor: pointer;
    transition: background-color 0.2s ease,
    color 0.2s ease;

    &:hover {
        color: ${(props) => (props.$isActive ? colors.green600 : colors.coolGray800)};
        background: ${(props) => (props.$isActive ? colors.green100 : colors.coolGrayBackground)};
    }

    ${MobileMenuPanel} & {
        padding: 10px 16px 22px;
        font-size: 16px;
        box-shadow: inset 0 -12px 0 ${colors.primaryWhite};
    }
`;
export const MenuGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${colors.coolGray150};

    &:last-child {
        padding-bottom: 0;
        border-bottom: 0;
    }

    ${MobileMenuPanel} & {
        gap: 0;
    }
`;

export const MenuTitle = styled.strong`
    display: flex;
    align-items: center;
    padding: 10px 16px;
    font-size: 17px;
    font-weight: 600;
    color: ${colors.coolGray800};

    ${MobileMenuPanel} & {
        font-size: 16px;
    }
`;

export const MenuList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 2px;
    list-style: none;
`;

export const MenuButton = styled.button<ActiveProps>`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 28px;
    font-size: 15px;
    font-weight: ${(props) => (props.$isActive ? 600 : 400)};
    border: 0;
    line-height: 1.4;
    text-align: left;
    color: ${(props) => (props.$isActive ? colors.green600 : colors.coolGray800)};
    background: ${(props) => (props.$isActive ? colors.green100 : colors.primaryWhite)};
    cursor: pointer;
    transition: background-color 0.2s ease,
    color 0.2s ease;

    &:hover {
        color: ${(props) => (props.$isActive ? colors.green600 : colors.coolGray800)};
        background: ${(props) => (props.$isActive ? colors.green100 : colors.coolGrayBackground)};
    }

    ${MobileMenuPanel} & {
        padding: 12px 28px;
    }
`;

export const Contents = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 56px;
    min-width: 0;

    @media (max-width: 767px) {
        gap: 64px;
        width: 100%;
    }
`;


export const AccordionSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 8px;
    scroll-margin-top: 88px;
`;

export const SectionTitle = styled.h2`
    padding: 8px;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.4;
    color: ${colors.coolGray800};

    @media (max-width: 767px) {
        padding: 8px 0;
        font-size: 20px;
    }
`;

export const AccordionList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AccordionItem = styled.article<OpenProps>`
    border-bottom: 1px solid ${colors.coolGray150};
    background: ${(props) => (props.$isOpen ? colors.coolGrayBackground : colors.primaryWhite)};
    transition: background-color 0.2s ease;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background: ${colors.coolGrayBackground};
        }
    }
`;

export const AccordionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    min-height: 64px;
    padding: 20px;
    border: 0;
    text-align: left;
    color: inherit;
    background: transparent;
    outline: none;
    cursor: pointer;

    @media (max-width: 767px) {
        gap: 8px;
        min-height: 56px;
        padding: 16px 12px;
    }

    span {
        font-size: 17px;
        font-weight: 600;
        line-height: 1.4;
        color: ${colors.coolGray800};
        transition: color 0.2s ease;

        @media (max-width: 767px) {
            font-size: 16px;
        }
    }

    &[aria-expanded='true'] span {
        color: ${colors.greenPrimary};
    }

    @media (hover: hover) and (pointer: fine) {
        &:hover span {
            color: ${colors.greenPrimary};
        }
    }
`;

export const Chevron = styled.i`
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    transform-origin: center;
    transition: transform 0.2s ease;

    @media (max-width: 767px) {
        flex-basis: 16px;
        width: 16px;
        height: 16px;
    }

    ${AccordionButton}[aria-expanded='true'] & {
        transform: rotate(180deg);
    }
`;

export const AccordionPanel = styled.div<OpenProps>`
    display: grid;
    grid-template-rows: ${(props) => (props.$isOpen ? '1fr' : '0fr')};
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    overflow: hidden;
    pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};
    transition: ${(props) =>
            props.$isInstant
                    ? 'none'
                    : css`
                        grid-template-rows 0.4s ease,
                        opacity 0.4s ease
                    `};

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

export const AccordionPanelInner = styled.div<OpenProps>`
    min-height: 0;
    padding: ${(props) => (props.$isOpen ? '0 20px 32px' : '0 20px')};
    font-size: 15px;
    font-weight: 400;
    line-height: 1.4;
    color: ${colors.coolGray800};
    overflow: hidden;
    transition: ${(props) => (props.$isInstant ? 'none' : 'padding 0.3s ease')};

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }

    @media (max-width: 767px) {
        padding: ${(props) => (props.$isOpen ? '0 12px 24px' : '0 12px')};
        font-size: 14px;
    }

    > * {
        margin: 0;
    }

    > * + * {
        margin-top: 14px;
    }

    ul {
        padding-left: 23px;
    }

    li + li {
        margin-top: 2px;
    }
`;

export const FaqContentHtml = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    p,
    ul,
    ol,
    blockquote,
    pre,
    h1,
    h2,
    h3 {
        margin: 0;
    }

    h1,
    h2,
    h3 {
        font-weight: 700;
        line-height: 1.35;
        color: ${colors.coolGray800};
    }

    h1 {
        font-size: 22px;
    }

    h2 {
        font-size: 19px;
    }

    h3 {
        font-size: 17px;
    }

    p {
        line-height: 1.7;
    }

    ul,
    ol {
        padding-left: 23px;
    }

    li + li {
        margin-top: 4px;
    }

    ul[data-type='taskList'] {
        padding-left: 0;
        list-style: none;
    }

    ul[data-type='taskList'] li {
        display: flex;
        align-items: flex-start;
        gap: 8px;
    }

    ul[data-type='taskList'] label {
        flex: 0 0 auto;
        margin-top: 2px;
    }

    ul[data-type='taskList'] div {
        flex: 1;
    }

    blockquote {
        padding: 10px 14px;
        border-left: 3px solid ${colors.greenPrimary};
        background: ${colors.primaryWhite};
    }

    a {
        color: ${colors.greenPrimary};
        text-decoration: underline;
        word-break: break-all;
    }

    img {
        display: block;
        max-width: 100%;
        height: auto;
        border: 1px solid ${colors.coolGray150};
        border-radius: 6px;
    }

    strong {
        font-weight: 700;
    }

    @media (max-width: 767px) {
        h1 {
            font-size: 20px;
        }

        h2 {
            font-size: 18px;
        }

        h3 {
            font-size: 16px;
        }
    }
`;

export const Highlight = styled.mark`
    font-weight: inherit;
    color: ${colors.greenPrimary};
    background: transparent;
`;

export const EmptyResult = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 30px 20px;
    text-align: center;
    color: ${colors.coolGray500};
    background: ${colors.primaryWhite};

    p {
        display: flex;
        flex-direction: column;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.4;
    }
`;

export const EmptyIcon = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    font-size: 40px;
    font-weight: 600;
    border-radius: 50%;
    line-height: 1;
    color: ${colors.coolGray200};
    background: ${colors.coolGray100};
`;

export const InfoBox = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
    padding: 40px 24px;
    border-radius: 16px;
    text-align: center;
    background: ${colors.coolGrayBackground};

    @media (max-width: 767px) {
        width: calc(100% + 32px);
        padding: 64px 24px;
        margin: 0 -16px;
        border-radius: 0;
    }
`;

export const InfoText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;

    h2 {
        font-size: 24px;
        font-weight: 600;
        line-height: 1.4;
        color: ${colors.primaryBlack};

        @media (max-width: 767px) {
            font-size: 20px;
        }
    }

    p {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.4;
        color: ${colors.primaryBlack};

        @media (max-width: 767px) {
            font-size: 15px;
        }
    }
`;

export const InfoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    @media (max-width: 767px) {
        flex-direction: column;
        width: 100%;
    }
`;

export const InfoContact = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
`;

const pillButton = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 100px;

    @media (max-width: 767px) {
        width: calc(100% - 32px);
        padding: 16px 20px;
    }
`;

export const CallButton = styled.button`
    ${pillButton};
    gap: 4px;
    border: 2px solid ${colors.greenPrimary};
    color: ${colors.greenPrimary};
    background: ${colors.primaryWhite};
    cursor: pointer;
    transition: background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;

    svg {
        display: block;
        flex: 0 0 12px;
        width: 12px;
        height: 12px;
    }

    &:hover {
        background: ${colors.green50};
    }
`;

export const InquiryButton = styled.button`
    ${pillButton};
    border: 2px solid ${colors.greenPrimary};
    color: ${colors.primaryWhite};
    background: ${colors.greenPrimary};
    cursor: pointer;
    transition: background-color 0.2s ease,
    border-color 0.2s ease;

    &:hover {
        border-color: ${colors.green600};
        background: ${colors.green600};
    }
`;

export const InfoCaption = styled.p`
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    color: ${colors.coolGray500};
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  position: relative;
  padding: 60px 60px 80px;
  border-top: 1px solid ${colors.coolGray150};
  color: ${colors.primaryBlack};
  background: ${colors.primaryWhite};

  @media (max-width: 1232px) {
    align-items: flex-start;
    padding: 30px 20px 40px;
  }
`;

export const FooterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.coolGray150};

  @media (max-width: 1232px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    width: 100%;
    padding-bottom: 12px;
  }
`;

export const FooterLogo = styled(Link)`
    display: inline-flex;
    align-items: center;
    overflow: hidden;

    img {
        display: block;
        width: 127px;
        height: auto;
    }
`;

export const FooterLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 32px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: ${colors.primaryBlack};

  a {
    color: inherit;
    text-decoration: none;

    &[aria-current='page'] {
      font-weight: 700;
    }
  }

  @media (max-width: 1232px) {
    gap: 12px 24px;
    font-size: 14px;
    line-height: normal;
  }
`;

export const FooterContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 1232px) {
    gap: 0;
    width: 100%;
  }
`;

export const FooterInfoRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  width: 100%;

  @media (max-width: 1232px) {
    display: contents;
    gap: 24px;
  }
`;

export const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  min-width: 0;

  @media (max-width: 1232px) {
    order: 1;
    width: 100%;
  }
`;

export const CompanyAddress = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.primaryBlack};

  strong {
    flex: 0 0 auto;
    font-weight: 700;
  }

  span {
    font-weight: 400;
  }

  @media (max-width: 1232px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    width: 100%;
    font-size: 14px;
    line-height: normal;

    span {
      max-width: 320px;
      line-height: 1.25;
      word-break: keep-all;
    }
  }
`;

export const CompanyMetaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 0;

  @media (max-width: 1232px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const CompanyMetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  position: relative;
  padding-right: 17px;
  margin-right: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: ${colors.primaryBlack};

    strong {
        font-weight: 700;
    }

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 1px;
    height: 12px;
    background: ${colors.coolGray400};
    transform: translateY(-50%);
  }

  @media (max-width: 1232px) {
    align-items: flex-start;
    padding-right: 0;
    margin-right: 0;
    font-size: 14px;
    line-height: normal;
    word-break: keep-all;

        &:not(:last-child)::after {
            display: none;
        }

    span {
      white-space: normal;
    }
  }
`;

export const FooterPhone = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  color: ${colors.primaryBlack};

  img {
    display: block;
    width: 36px;
    height: 36px;
  }

  strong {
    font-size: 36px;
    font-weight: 700;
    line-height: normal;
    white-space: nowrap;
  }

  @media (max-width: 1232px) {
    order: 3;
    margin-top: 24px;

    img {
      width: 24px;
      height: 24px;
    }

    strong {
      font-size: 26px;
    }
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  width: 100%;

  @media (max-width: 1232px) {
    display: contents;
    gap: 24px;
  }
`;

export const Copyright = styled.p`
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: ${colors.coolGray400};

  @media (max-width: 1232px) {
    order: 2;
    min-width: 100%;
    margin-top: 8px;
    font-size: 15px;
    line-height: normal;
  }
`;

export const RelatedSites = styled.div`
  position: relative;
  flex: 0 0 auto;
  max-width: 100%;

  @media (max-width: 1232px) {
    order: 4;
    margin-top: 24px;
  }
`;

export const RelatedSitesButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-width: 180px;
  min-height: 40px;
  max-width: 100%;
  padding: 10px 16px 10px 20px;
  font-size: 14px;
  font-weight: 600;
  border: 0;
  border-radius: 20px;
  line-height: 1.2;
  color: ${colors.coolGray600};
  background: ${colors.coolGray100};
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  img {
    display: block;
    width: 16px;
    height: 16px;
    transition:
      filter 0.2s ease,
      transform 0.2s ease;
  }

  &:hover,
  &:focus-visible {
    color: ${colors.primaryWhite};
    background: ${colors.greenPrimary};
  }

  &:hover img,
  &:focus-visible img {
    filter: brightness(0) invert(1);
  }

  &[aria-expanded='true'] {
    color: ${colors.primaryWhite};
    background: ${colors.greenPrimary};
  }

  &[aria-expanded='true'] img {
    filter: brightness(0) invert(1);
    transform: rotate(45deg);
  }

  @media (hover: none) {
    &:hover {
      color: ${colors.coolGray600};
      background: ${colors.coolGray100};
    }

    &:hover img {
      filter: none;
    }

    &[aria-expanded='true'],
    &[aria-expanded='true']:hover {
      color: ${colors.primaryWhite};
      background: ${colors.greenPrimary};
    }

    &[aria-expanded='true'] img,
    &[aria-expanded='true']:hover img {
      filter: brightness(0) invert(1);
    }
  }
`;

export const RelatedSitesMenu = styled.ul<DisclosureProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  width: max-content;
  min-width: 100%;
  max-width: min(320px, calc(100vw - 40px));
  max-height: 320px;
  padding: 8px 0;
  margin: 0;
  border: 1px solid ${colors.coolGray150};
  border-radius: 12px;
  list-style: none;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  background: ${colors.primaryWhite};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};
  transform: translateY(${(props) => (props.$isOpen ? '0' : '6px')});
  transition:
    opacity 0.16s ease,
    transform 0.16s ease,
    visibility 0s linear ${(props) => (props.$isOpen ? '0s' : '0.16s')};
  z-index: 2;

  a {
    display: block;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    color: ${colors.primaryBlack};
    text-decoration: none;

    &:hover {
      background: ${colors.coolGrayBackground};
    }
  }

  @media (max-width: 1232px) {
    right: auto;
    left: 0;
    bottom: calc(100% + 8px);
  }
`;

export const FooterTopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 60px;
  bottom: 60px;
  width: 70px;
  height: 70px;
  padding: 10px;
  border: 1px solid ${colors.coolGray150};
  border-radius: 8px;
  background: ${colors.primaryWhite};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;

  img {
    display: block;
    width: 36px;
    height: 36px;
  }

  @media (max-width: 1232px) {
    display: none;
  }
`;











