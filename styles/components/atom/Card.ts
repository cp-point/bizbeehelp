import styled from "styled-components";

type CardWrapperProps = {
	$width?: string;
	$minHeight?: string;
	$padding?: string;
	$margin?: string;
	$gap?: string;
	$backgroundColor?: string;
	$border?: string;
	$borderRadius?: string;
	$shadow?: string;
};

export const CardWrapper = styled.div<CardWrapperProps>`
	display: flex;
	flex-direction: column;
	width: ${(props) => props.$width};
	min-height: ${(props) => props.$minHeight};
	margin: ${(props) => props.$margin};
	padding: ${(props) => props.$padding};
	gap: ${(props) => props.$gap};
	background-color: ${(props) => props.$backgroundColor};
	border: ${(props) => props.$border};
	border-radius: ${(props) => props.$borderRadius};
	box-shadow: ${(props) => props.$shadow};
	box-sizing: border-box;
`;

export const CardHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
`;

export const CardTitle = styled.div`
	min-width: 0;
	color: #1f1f1f;
	font-size: 16px;
	font-weight: 600;
	line-height: 1.4;
`;

export const CardBody = styled.div`
	min-width: 0;
	color: #1f1f1f;
	font-size: 14px;
	line-height: 1.5;
`;
