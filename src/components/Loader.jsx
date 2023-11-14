import { ProgressBar } from 'react-loader-spinner';
import styled from 'styled-components';

const Loader = styled.div`
  display: flex;
  justify-content: center;
`;
export const LoaderCont = () => {
  return (
  <Loader>
  <ProgressBar
  height="80"
  width="80"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#F4442E'
  barColor = '#51E5FF'
/>
</Loader>
  );
};