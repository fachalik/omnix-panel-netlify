import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { palette } from '@/theme/themeConfig';
// import { Container, Typography, Box, Button } from '@mui/material';
// import errorImg from 'assets/error.svg';

/**
 * An error screen that will be used as a fallback UI.
 * @see https://reactjs.org/docs/error-boundaries
 */
export default class ErrorBoundary extends React.Component<Props> {
  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  // eslint-disable-next-line react/state-in-constructor
  override state: State = { error: undefined };

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  override render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f0f0f0',
        }}
      >
        <Row style={{ width: '100%', zIndex: 5 }} justify="center">
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <Card bodyStyle={{ padding: 0 }} bordered={false}>
              <Row>
                <Col xs={0} sm={0} md={0} lg={14} xl={14}>
                  <div
                    style={{
                      height: '75vh',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderTopLeftRadius: 7,
                      borderBottomLeftRadius: 7,
                      backgroundColor: palette.primary.main,
                    }}
                  >
                    <p
                      style={{
                        color: 'rgba(0,0,0,0.5)',
                        paddingBottom: '20px',
                        fontSize: '1.5em',
                      }}
                    >
                      <strong>Error {error.status || 500}</strong>
                    </p>
                    <h1
                      style={{
                        color: 'rgba(0,0,0,0.5)',
                        fontSize: '1.5em',
                        fontWeight: 400,
                        // '& strong': {},
                      }}
                    >
                      {error.message}
                    </h1>
                    <Button
                      style={{ marginTop: '20px' }}
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Refresh page
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      // <Container>
      //   <Box
      //     position="absolute"
      //     top="50%"
      //     left="50%"
      //     sx={{
      //       transform: 'translate(-50%, -50%)',
      //     }}
      //     display="flex"
      //   >
      //     <Box
      //       bgcolor="#FF8F00"
      //       padding="20px"
      //       width="400px"
      //       borderRadius="8px"
      //       position="relative"
      //       mr={4}
      //     >
      //       <Typography
      //         sx={{
      //           color: 'rgba(0,0,0,0.5)',
      //           pb: '20px',
      //           fontSize: '1.5em',
      //         }}
      //       >
      //         <strong>Error {error.status || 500}</strong>
      //       </Typography>
      //       <Typography
      //         variant="h1"
      //         sx={{
      //           color: 'rgba(0,0,0,0.5)',
      //           fontSize: '1.5em',
      //           fontWeight: 400,
      //           '& strong': {},
      //         }}
      //       >
      //         {error.message}
      //       </Typography>
      //       <Button
      //         sx={{ mt: '20px' }}
      //         onClick={() => {
      //           window.location.reload();
      //         }}
      //       >
      //         Refresh page
      //       </Button>
      //       <Box
      //         sx={{
      //           position: 'absolute',
      //           top: '20px',
      //           right: '-20px',
      //           width: 0,
      //           height: 0,
      //           borderTop: '21px solid transparent',
      //           borderBottom: '21px solid transparent',
      //           borderLeft: '21px solid #FF8F00',
      //         }}
      //       />
      //     </Box>

      //     {/* <Box component="img" src={errorImg} alt="you'r online" height={200} /> */}
      //   </Box>
      // </Container>
    );
  }
}

type Props = {
  children: React.ReactNode;
};

type State = {
  error: (Error & { status?: number }) | undefined;
};
