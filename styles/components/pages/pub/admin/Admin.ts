import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';

type ButtonProps = {
  $variant: 'solid' | 'sub' | 'line' | 'del';
  $size: 'small' | 'large';
};

type HeaderButtonProps = {
  $variant: 'line' | 'sub';
};

type SearchCellProps = {
  $wide?: 'large';
};

type FormCellProps = {
  $span?: 'wide' | 'full';
};

type SelectBoxProps = {
  $table?: boolean;
  $disabled?: boolean;
};

type SelectButtonProps = {
  $isOpen?: boolean;
  $table?: boolean;
};

type SelectChevronProps = {
  $isOpen?: boolean;
};

type TableScrollProps = {
  $filled?: boolean;
};

type PaginationIconProps = {
  $icon: 'first' | 'prev' | 'next' | 'last';
};

type DataTableProps = {
  $minWidth?: number;
};

const colors = {
  primaryWhite: '#ffffff',
  coolGrayBackground: '#f4f7f9',
  coolGray50: '#f8f9fb',
  coolGray100: '#eef1f6',
  coolGray150: '#e4e8ee',
  coolGray200: '#cdd3dd',
  coolGray400: '#8d99a8',
  coolGray600: '#414d5c',
  coolGray800: '#0f1b2a',
  green50: '#ecfdf3',
  green100: '#d1fadf',
  green200: '#abefc6',
  green300: '#6ce9a6',
  green600: '#039855',
  green200Light: '#a6f4c5',
  greenPrimary: '#16b364',
  red50: '#fef3f2',
  red500: '#f04438',
};

const control = css`
  width: 100%;
  height: 28px;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 400;
  border: 1px solid ${colors.coolGray150};
  border-radius: 4px;
  outline: none;
  color: ${colors.coolGray800};
  background: ${colors.primaryWhite};

  &::placeholder {
    color: ${colors.coolGray400};
  }

  &:focus {
    border-color: ${colors.greenPrimary};
    box-shadow: 0 0 0 2px rgba(22, 179, 100, 0.12);
  }

  &:disabled {
    color: ${colors.coolGray400};
    background: ${colors.coolGray50};
    cursor: not-allowed;
  }
`;

const toastEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Page = styled.main`
  min-height: 100vh;
  color: ${colors.coolGray800};
  background: ${colors.primaryWhite};

  button,
  input,
  select,
  textarea {
    font-family: inherit;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  height: 64px;
  padding: 0 32px;
  border-bottom: 1px solid ${colors.coolGray200};
  background: ${colors.primaryWhite};
  z-index: 99;
`;

export const HeaderLogo = styled(Link)`
  display: inline-flex;
  align-items: center;

  img {
    display: block;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const HeaderButtonLink = styled(Link)<HeaderButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 11px 16px;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid ${(props) => (props.$variant === 'line' ? colors.greenPrimary : colors.coolGray200)};
  border-radius: 4px;
  line-height: 16px;
  text-decoration: none;
  color: ${(props) => (props.$variant === 'line' ? colors.greenPrimary : colors.coolGray800)};
  background: ${colors.primaryWhite};
  transition:
    border-color 0.2s,
    color 0.2s,
    background-color 0.2s;

  &:hover {
    border-color: ${(props) => (props.$variant === 'line' ? colors.green600 : colors.coolGray200)};
    color: ${(props) => (props.$variant === 'line' ? colors.greenPrimary : colors.coolGray800)};
    background: ${(props) => (props.$variant === 'line' ? colors.green50 : colors.coolGray50)};
  }
`;

export const Body = styled.div`
  display: flex;
  min-height: calc(100vh - 64px);
  background: ${colors.primaryWhite};
`;

export const SideMenu = styled.aside`
  position: sticky;
  top: 64px;
  flex: 0 0 220px;
  min-width: 220px;
  height: calc(100vh - 64px);
  padding: 40px 10px 24px;
  background: #1e293b;
  z-index: 10;
`;

export const SideMenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;

  a {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 17px;
    font-weight: 500;
    border-radius: 4px;
    text-decoration: none;
    color: ${colors.primaryWhite};
  }

  a:hover,
  a[data-active='true'] {
    color: ${colors.primaryWhite};
    background: rgba(129, 217, 255, 0.1);
  }
`;

export const Main = styled.section`
  flex: 1;
  overflow-x: auto;
  min-width: 0;
  background: ${colors.primaryWhite};
`;

export const Headline = styled.header`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 1254px;
  width: 100%;
  padding: 0 24px;
  background: ${colors.primaryWhite};
`;

export const HeadlineInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;

  h1 {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
  }
`;

export const HeadlineActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 1254px;
  width: 100%;
  padding: 16px 24px 32px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 17px;
    font-weight: 600;
  }
`;

const buttonSize = {
  small: css`
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 400;
    line-height: 14px;
  `,
  large: css`
    padding: 11px 16px;
    font-size: 15px;
    font-weight: 500;
    line-height: 16px;
  `,
};

const buttonVariant = {
  solid: css`
    border-color: ${colors.greenPrimary};
    color: ${colors.primaryWhite};
    background: ${colors.greenPrimary};

    &:hover {
      border-color: ${colors.green600};
      background: ${colors.green600};
    }

    &:disabled {
      border-color: ${colors.coolGray200};
      color: ${colors.primaryWhite};
      background: ${colors.coolGray200};
    }
  `,
  sub: css`
    border-color: ${colors.coolGray200};
    color: ${colors.coolGray800};
    background: ${colors.primaryWhite};

    &:hover {
      border-color: ${colors.coolGray200};
      color: ${colors.coolGray800};
      background: ${colors.coolGray50};
    }

    &:disabled {
      border-color: ${colors.coolGray200};
      color: ${colors.coolGray200};
      background: ${colors.coolGray150};
    }
  `,
  line: css`
    border-color: ${colors.greenPrimary};
    color: ${colors.greenPrimary};
    background: ${colors.primaryWhite};

    &:hover {
      border-color: ${colors.green600};
      background: ${colors.green50};
    }

    &:disabled {
      border-color: ${colors.green200Light};
      color: ${colors.green200Light};
      background: ${colors.primaryWhite};
    }
  `,
  del: css`
    border-color: ${colors.red500};
    color: ${colors.red500};
    background: ${colors.primaryWhite};

    &:hover {
      border-color: ${colors.red500};
      color: ${colors.red500};
      background: ${colors.coolGray50};
    }

    &:disabled {
      border-color: ${colors.coolGray200};
      color: ${colors.coolGray200};
      background: ${colors.coolGray150};
    }
  `,
};

const buttonBase = css<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border: 1px solid;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s,
    background-color 0.2s;

  ${(props) => buttonSize[props.$size]}
  ${(props) => buttonVariant[props.$variant]}

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Button = styled.button<ButtonProps>`
  ${buttonBase}
`;

export const ButtonLink = styled(Link)<ButtonProps>`
  ${buttonBase}
`;

export const ButtonGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid ${colors.coolGray200};
  border-left: 1px solid ${colors.coolGray200};
  background: ${colors.primaryWhite};
`;

export const SearchCell = styled.div<SearchCellProps>`
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  border-right: 1px solid ${colors.coolGray200};
  border-bottom: 1px solid ${colors.coolGray200};

  ${(props) =>
    props.$wide === 'large' &&
    css`
      grid-column: span 2;
    `}
`;

export const SearchLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 500;
  border-right: 1px solid ${colors.coolGray200};
  text-align: right;
  color: ${colors.coolGray800};
  background: ${colors.coolGrayBackground};
`;

export const RequiredMark = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${colors.red500};
`;

export const SearchControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 8px;

  span {
    font-size: 12px;
    color: ${colors.coolGray600};
  }
`;

export const Input = styled.input`
  ${control}
  width: calc(100% - 16px);
  margin: 8px;
`;

export const DateInput = styled.input`
  ${control}
  position: relative;
  min-width: 0;
  padding-right: 34px;
  background-image: url('/assets/images/admin-calendar.svg');
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 16px 16px;

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 8px;
    width: 16px;
    height: 16px;
    opacity: 0;
    cursor: pointer;
  }
`;

export const SelectBox = styled.div<SelectBoxProps>`
  position: relative;
  width: calc(100% - 16px);
  margin: 8px;
  z-index: ${(props) => (props.$disabled ? 1 : 50)};

  &:focus-within {
    z-index: 200;
  }

  ${(props) =>
    props.$table &&
    css`
      width: 100%;
      margin: 0;
    `}
`;

export const SelectButton = styled.button<SelectButtonProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  height: 28px;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 400;
  border: 1px solid ${(props) => (props.$isOpen ? colors.greenPrimary : colors.coolGray150)};
  border-radius: 4px;
  color: ${colors.coolGray800};
  background: ${colors.primaryWhite};
  cursor: pointer;

  span {
    overflow: hidden;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  &:disabled {
    border-color: ${colors.coolGray150};
    color: ${colors.coolGray200};
    background: ${colors.coolGray50};
    cursor: not-allowed;
  }

  ${(props) =>
    props.$table &&
    css`
      height: 24px;
      padding: 0 8px;
    `}
`;

export const SelectChevron = styled.span<SelectChevronProps>`
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  background: currentColor;
  mask: url('/assets/images/admin-chevron-down.svg') center / 16px 16px no-repeat;
  transform: rotate(${(props) => (props.$isOpen ? '180deg' : '0deg')});
`;

export const Dropdown = styled.div<SelectBoxProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  overflow-y: auto;
  width: 100%;
  max-height: 200px;
  padding: 8px 0;
  border: 1px solid ${colors.coolGray150};
  border-radius: 4px;
  background: ${colors.primaryWhite};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.16);
  z-index: 300;

  ${(props) =>
    props.$table &&
    css`
      top: calc(100% + 2px);
    `}
`;

export const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 400;
  border: 0;
  text-align: left;
  color: ${colors.coolGray800};
  background: ${colors.primaryWhite};
  cursor: pointer;

  &:hover {
    background: ${colors.coolGray50};
  }
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  border: 1px solid ${colors.coolGray200};
  border-radius: 3px;
  appearance: none;
  background: ${colors.primaryWhite};
  cursor: pointer;

  &:checked {
    border-color: ${colors.greenPrimary};
    background: ${colors.greenPrimary} url('/assets/images/admin-checkbox-checked.svg') center / 16px 16px no-repeat;
  }

  &:disabled {
    background: ${colors.coolGray150};
    cursor: not-allowed;
  }

  &:checked:disabled,
  &:checked[readonly] {
    border-color: ${colors.coolGray200};
    background-color: ${colors.coolGray150};
  }
`;

export const TableCheckbox = styled(Checkbox)`
  vertical-align: middle;
`;

export const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 8px;
  font-size: 13px;
  color: ${colors.coolGray800};
  cursor: pointer;
`;

export const TableScroll = styled.div<TableScrollProps>`
  overflow-x: auto;
  overflow-y: auto;
  width: 100%;
  max-height: 930px;
  background: ${colors.coolGray50};

  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    border-radius: 999px;
    background: ${colors.coolGray200};
    background-clip: content-box;
  }
`;

export const DataTable = styled.table<DataTableProps>`
  width: 100%;
  min-width: ${(props) => `${props.$minWidth ?? 1644}px`};
  border-collapse: separate;
  border-spacing: 0;
  border-left: 1px solid ${colors.coolGray200};
  table-layout: fixed;

  thead {
    position: sticky;
    top: 0;
    z-index: 20;
  }

  th,
  td {
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 30px;
    padding: 0 8px;
    font-size: 13px;
    border-right: 1px solid ${colors.coolGray200};
    border-bottom: 1px solid ${colors.coolGray200};
    text-align: center;
  }

  th {
    position: sticky;
    top: 0;
    overflow: hidden;
    font-weight: 500;
    border-top: 1px solid ${colors.coolGray200};
    color: ${colors.coolGray800};
    background: ${colors.coolGrayBackground};
    z-index: 20;
  }

  td {
    color: ${colors.coolGray800};
    background: ${colors.primaryWhite};
  }

  td:not(:has(${SelectBox})) {
    overflow: hidden;
  }

  td[data-align='left'] {
    text-align: left;
  }

  td[data-align='left'] input {
    text-align: left;
  }

  tr[data-selected='true'] td {
    background: ${colors.green100};
  }

  tr[data-selected='true'] td[data-active='true'] {
    background: ${colors.green300};
  }

  td[data-editable='true'][data-editing='true'] {
    background: ${colors.primaryWhite} !important;
  }
`;

export const TableLink = styled.button`
  display: inline;
  padding: 0;
  font: inherit;
  border: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
  color: inherit;
  background: transparent;
  cursor: pointer;
`;

export const OrderValue = styled.span`
  display: block;
  width: 100%;
`;

export const TableInput = styled.input`
  ${control}
  height: 24px;
  text-align: center;
`;

export const EmptyCell = styled.td`
  padding: 320px 0 !important;
  font-size: 15px !important;
  font-weight: 500;
  text-align: center;
  color: ${colors.coolGray400} !important;
`;

export const Pagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin-top: 8px;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 13px;
    font-weight: 400;
    border: 1px solid transparent;
    border-radius: 4px;
    color: ${colors.coolGray800};
    background: transparent;
    cursor: pointer;
  }

  button:nth-child(3),
  button[data-group='next'] {
    margin-left: 6px;
  }

  button[data-active='true'] {
    font-weight: 700;
    color: ${colors.primaryWhite};
    background: ${colors.greenPrimary};
  }

  button[aria-label] {
    border-color: ${colors.coolGray200};
    background: ${colors.primaryWhite};
  }

  button:disabled {
    border-color: ${colors.coolGray100};
    color: ${colors.coolGray200};
    background: ${colors.primaryWhite};
    cursor: default;
  }

  button:hover:not([data-active='true']):not(:disabled) {
    background: ${colors.coolGray100};
  }
`;

export const PaginationIcon = styled.span<PaginationIconProps>`
  display: block;
  width: 16px;
  height: 16px;
  background: currentColor;
  mask: url(${(props) => `/assets/images/admin-pagination-${props.$icon}.svg`}) center / 16px 16px no-repeat;
`;

export const TabList = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.coolGray150};

  button {
    padding: 8px 24px 12px;
    font-size: 15px;
    font-weight: 500;
    border: 0;
    border-bottom: 2px solid transparent;
    line-height: normal;
    color: ${colors.coolGray600};
    background: ${colors.primaryWhite};
    cursor: pointer;
  }

  button[data-active='true'] {
    border-bottom-color: ${colors.greenPrimary};
    color: ${colors.greenPrimary};
  }
`;

export const FormSection = styled.section`
  background: ${colors.primaryWhite};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid ${colors.coolGray200};
  border-left: 1px solid ${colors.coolGray200};
`;

export const FormCell = styled.div<FormCellProps>`
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  min-height: 44px;
  border-right: 1px solid ${colors.coolGray200};
  border-bottom: 1px solid ${colors.coolGray200};

  ${(props) =>
    props.$span === 'wide' &&
    css`
      grid-column: span 2;
    `}

  ${(props) =>
    props.$span === 'full' &&
    css`
      grid-column: 1 / -1;
    `}
`;

export const StaticText = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  padding: 0 8px;
  font-size: 13px;
  font-weight: 400;
  color: ${colors.coolGray800};

  span {
    color: ${colors.coolGray400};
  }
`;

export const StaticTextEmphasis = styled.span`
  font-weight: 500;
  color: ${colors.coolGray800};
`;

export const EditorSection = styled.section`
  height: clamp(520px, calc(100vh - 230px), 720px);
  border: 1px solid ${colors.coolGray200};
  background: ${colors.primaryWhite};
`;

export const Toast = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  left: 252px;
  bottom: 32px;
  width: 320px;
  height: 64px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 400;
  border-left: 6px solid ${colors.greenPrimary};
  border-radius: 4px;
  line-height: 1.4;
  color: ${colors.primaryWhite};
  background: ${colors.coolGray600};
  animation: ${toastEnter} 0.2s ease-out;
  z-index: 20;
`;

export const Dimmed = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

export const AlertModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 30px;
  border: 1px solid ${colors.coolGray150};
  border-radius: 8px;
  color: ${colors.coolGray800};
  background: ${colors.primaryWhite};
  box-shadow: 0 4px 12px rgba(16, 24, 40, 0.08);
  transform: translate(-50%, -50%);
  z-index: 101;
`;

export const AlertTitle = styled.p`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  color: ${colors.coolGray800};
`;

export const AlertActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

export const AlertActionButton = styled.button<{ $variant: 'soft' | 'solid' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid ${(props) => (props.$variant === 'soft' ? colors.coolGray200 : colors.greenPrimary)};
  border-radius: 4px;
  line-height: normal;
  color: ${(props) => (props.$variant === 'soft' ? colors.coolGray800 : colors.primaryWhite)};
  background: ${(props) => (props.$variant === 'soft' ? colors.primaryWhite : colors.greenPrimary)};
  cursor: pointer;
`;
