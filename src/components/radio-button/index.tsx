import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <span style={{backgroundColor: '#228B22', borderRadius: '50%', width: '1rem', height: '1rem', marginRight: '0.2rem'}}></span>,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <span style={{backgroundColor: '#228B22', borderRadius: '50%', width: '1rem', height: '1rem', marginRight: '0.2rem'}}></span>,
    label: 'Dissatisfied',
  },
  3: {
    icon: <span style={{backgroundColor: '#F8DE7E', borderRadius: '50%', width: '1rem', height: '1rem', marginRight: '0.2rem'}}></span>,
    label: 'Neutral',
  },
  4: {
    icon: <span style={{backgroundColor: '#F8DE7E', borderRadius: '50%', width: '1rem', height: '1rem', marginRight: '0.2rem'}}></span>,
    label: 'Satisfied',
  },
  5: {
    icon: <span style={{backgroundColor: '#ff5050', borderRadius: '50%', width: '1rem', height: '1rem', marginRight: '0.2rem'}}></span>,
    label: 'Very Satisfied',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function RadioGroupRating() {
  return (
    <StyledRating
      name="highlight-selected-only"
      defaultValue={2}
      IconContainerComponent={IconContainer}
      getLabelText={(value: number) => customIcons[value].label}
      highlightSelectedOnly
    />
  );
}
