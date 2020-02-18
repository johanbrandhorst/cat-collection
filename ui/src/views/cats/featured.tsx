import React, { Component } from "react";

import { CatServiceClient } from "../../proto/api/v1/ApiServiceClientPb";
import {
  GetFeaturedCatsRequest,
  Cat,
  GetFeaturedCatsResponse
} from "../../proto/api/v1/api_pb";

import {
  Icon,
  Text,
  Box,
  Image,
  Heading,
  SimpleGrid,
  CircularProgress,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle
} from "@chakra-ui/core";
import { Error, Status } from "grpc-web";

interface FeaturedCatsProps {
  client: CatServiceClient;
}

interface FeaturedCatsState {
  error: Error | undefined;
  isLoaded: boolean;
  cats: Cat[];
}

class FeaturedCats extends Component<FeaturedCatsProps, FeaturedCatsState> {
  static defaultProps = {
    client: new CatServiceClient("", null, null)
  };

  state: FeaturedCatsState = {
    error: undefined,
    isLoaded: false,
    cats: []
  };

  componentDidMount() {
    let req = new GetFeaturedCatsRequest();
    const call = this.props.client.getFeaturedCats(
      req,
      null,
      (err: Error, response: GetFeaturedCatsResponse) => {
        console.log(err, response);
        this.setState({ isLoaded: true });
        if (err) {
          this.setState({ error: err });
          return;
        }
        this.setState({ cats: response.getCatsList() });
      }
    );
    call.on("status", (status: Status) => {
      if (status.metadata) {
        console.log("Received metadata");
        console.log(status.metadata);
      }
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          border={5}
          borderRadius={5}
          p={5}
          textAlign="left"
        >
          <Box>
            <Box>
              <Heading
                size="xl"
                as="h2"
                lineHeight="shorter"
                fontWeight="bold"
                fontFamily="heading"
              >
                Featured cats
              </Heading>
            </Box>
          </Box>
          <CircularProgress isIndeterminate color="gray.300"></CircularProgress>
        </Box>
      );
    }

    if (this.state.error) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          border={5}
          borderRadius={5}
          p={5}
          textAlign="left"
        >
          <Box>
            <Box>
              <Heading
                size="xl"
                as="h2"
                lineHeight="shorter"
                fontWeight="bold"
                fontFamily="heading"
              >
                Featured cats
              </Heading>
            </Box>
          </Box>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={1}>Error</AlertTitle>
            <AlertDescription>{this.state.error.message}</AlertDescription>
          </Alert>
        </Box>
      );
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        border={5}
        borderRadius={5}
        p={5}
        textAlign="left"
      >
        <Box>
          <Box>
            <Heading
              size="xl"
              as="h2"
              lineHeight="shorter"
              fontWeight="bold"
              fontFamily="heading"
            >
              Featured cats
            </Heading>
          </Box>
        </Box>
        <SimpleGrid spacingX={1} spacingY={1} minChildWidth={120}>
          <Box
            display="block"
            borderRadius="lg"
            backgroundColor="white"
            pl={3}
            pr={3}
            pt={5}
            pb={5}
            shadow="sm"
          >
            {this.state.cats.map((value: Cat, index: Number, array: Cat[]) => {
              <Box shadow={0} border={0} borderRadius={0}>
                <Image
                  height={200}
                  width={200}
                  fallbackSrc="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhISEhEQEhAQEA8QEBAPDw8PDw8QFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNyg5OjcBCgoKDg0OGhAQGisdFR0rKy0tLSsrLSstLS0tLS0tLS0tLS0tNy0tLS0tLTc3LTc3LTc3Ny0tNzc3LS0rNy0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAECBwj/xAA6EAABBAECBAMGBAUDBQEAAAABAAIDEQQhMQUSQVEGYXETFCIygZEVQlKhByNisdGCweEzU7Lw8Rb/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMEAAX/xAAnEQACAgICAgEDBQEAAAAAAAAAAQIRAyESMRNBBBRRYQUVIjJxQv/aAAwDAQACEQMRAD8ArcHdazWldY+6IkcCaU4SK0KY2m6TYY3wrqDHFo99VSaU1aCkRYsJoUup4iCiMI0t5DhrrqjklfRytAjWNIN7onh8YJopawkOu9FNJmVsk0HsO4o0AUENhtANndCyZJOpUD5j0RTQGtD/ACpQQgYnsDrJS727tiVprL6rnIEYjWajq3ZKntcDaMilptKCSfT1TVoa9nLXm6U08jQPNaa0V5qGeOxqp+yiejRNahTCSwUHCCfQLT3kFFS2B9AkoJeAmMkdNChhZZtGxMJ3VG7JpVoH2C5hddhHvjbS5gxwbITQnQuSCZvFZyqF8QLiRui2NNEISB9OKVux0qNO10Kc8KdTglktWmPCYuZ7UF2hJP8Aiyy86JhyFjcZvVdxw9ldnn2b9osW+UrFx1nljQt4/wA2qkZETsFFy/FSwJ0j1KC/bAHTZblyLKxmE4rUmK4dEbTO2gjHzQAh3zOcSVxFjm9UdDjj6Lnb6OAwwlSNg6FHmIArDS6gqIEzEvfZdSQRjrqppZOyRSl75KB0H0VYxQJsayRNQgBaUHxnPLB7NhHtCPiJ19mP8pd4d4o9zzFK7mB+Rx38wuUbYLpFlc77IbIZqCE9GMws6XSVujF0VWcKXYsZWcwElDzz60mMDQErzmW/RZ2i6JHODW33UONC5+q5mebArRNsACgAmiiU3TI4MWkwbiBrbJW3tA3UeRMTp0VOOhOVirLebW8DIIdS4zW9lmFASdFeENWSnPdDiV4AsdUNjxDmsqZwoUd0LzarP+DTWrOsnl5tE14LJTgkjoiTonXBW/GFy1InP+rLIZSV22UrgtWhH5rUeb7J+Y91ii+q0jRxTcTS9EskP8z6pq0ikDLjknmXnVo9oYRyHRSbofHdYARDhpogh+OgfKh0cezS4UeypkfiDKY4u+F0dn4TpoD3V6OoruKVHyIC2UwPADbcQfIm06bJ8bLLwvxJBOAAQx/Vrj18j1TqDhU8nyMc4HqAa+68h4hjlryW2K2I0Vi8IeJuIska2OV5YN71Feq5x9i8ndHqEPgTKd8xawH+qyk3iXBxOGxufJM2Wdw/lxNq+buUQf4jTBrWk243zFUPxDF73KZw6yW7HWjaEb99HNC6OQujdI7WSQkudvflSD4YSMiM93aaUjfwLIDdCD1q6SiRkkUjS4Fpa4HX11VtUT3Z6e2YixfUqN0ZOqhgtzWn9TQfujYXDYpJS1Q35IPZGt0MYjaYvf2UEo6oPoKOW4wI21RmJDyiyocWS0RkyaUE8OJDI9g88hcfJDvJ7qdzCBaia2wU0pV0GCsjdR+qa8Lia0WlDcV5Omyb48TgK8kuT5DqkUhgVguW+30FmXDyj6KPkdzHStVFl5J2KOLbDPSJsGUdU54SR7S+iq+FqVaOFx05U4/yJT/qPXlcAnsutFrnpWMDOKd2WKb3k9lpMLZU2waaohrWhqj5rXT2aLznZ7DaFk0tE1ojsKRpGpQObCTsD9lFDiS3oHfZBJjxmhpIReirfi7DJDJRo8Hl+6sTcSSvld9lxxHAe6E8zDo9pGnZFJ0BSRH4d8FMkb7XIddgHk6bLXGooMZrhGGtfRoBQ5Xiz2DPZkEmgB5JDxXhuZJGJ9XiXQAalJCE5MaTjFCHJzDy2dCHEofD4m5riRsdaOyCyy7mIcC0g0Qe664bj+0kawmgTuey1KPozOV7LAzjp60PQoXNc2YfNr0THj3D4I4CBQkDtCDq4d1WsDR31/ZLLHx2NGfLR6d4RhM+OGj/AKkIr1b0CKkxHAmwR690B4GmLHlzdv2XoLpopW8sjQD3CjzTDODRS4mUe6jyJwFccbw9C4kB/wBFP/8AjoOpv1VVjUkSU+J56QfmGyIifzUvQWeF8cCtFLF4exm9Aj4hZTsoUp0qiuWQ+R+y9HHCsYdApWYmOPytQeL8gjOihQQHflP2R0cBP5T9lcw3HHQfZdCaHsEjwlVnKFl4paLpIjhl7l6fk+xduAgm8PguwAnhBxYJZbKpwzwxNfMG2E5ZwKZp5iKCtmLkNaKCzPyfgPoqJ7JSk2itlijeRa6bJd+q6ZCCrWZqI6HdYiPdgsQ5C0OY+B4w6BTfh+MOjUjdmDuVr3tvcrPyNyTHRwsb9LVsQ446N+yR+/BcnO8iu5A4ux+TCOg+yD4nFHIxzQBdJV775KWDMNjRLKWtDxX8r9HlHjLBcHWBVGtt0qwPF08DeQtsdL/KvX/E3hx07faR0R2PReY+I/CEurw2q30Qw5+Npl8mJSVoSxFuXLK6QAPbHzfDs830SB1td2pOMF3u8hcWl3wloG1JVkOBN6Wfv6Ky3sz01o0ZHO1cSfUo3h8dGyDRWuHYbiQaV44Xwew1xH06LPmy6ovixexj4YjplpvkTkdVHBGGih0UUztCsDe7NHGwvH4mQRZII2P+VYcfivMLJ129fNUSbXrp+5UmNlSNPWunoteLJ6I5MSZen5n9RUZ4gO5SPHyiRup4spp0fQPdX5Gd4qGbuIBcN4he1qMY4IsUR3C6ghpFWxGqOjmO10UHvrkRJVIZrE2waMOU8rpuQ9bESkbGmj2AxuW8LiXiMlG9lL7NC5gpjiqJKxZN0cQzkhSsl13SXHyEbG9UaM9jP2/msQPOsS8TrDfZeS6EXkp/aN7rTZ2nYrEbyIReS6EK7OQ1a96auOMEKlZD9lAcwdlp3EQOi4JYOGZYa7kq2lF8U4GyQGgKcOyqWNnlwLh0V44Ble0jF7hI8fsKm0eaeJf4cxSAuALHfl5diVR5fAUrX8rmimn5u6+j8iAEJDxDhzSFFylFl4zUtHlHD/DrWVpZCcMgDU64hA1prZJZHWaUJNsr/hC+z6IeZtI0xGkPKzoUtBQLHiFzk0h4T1O6ZcL4ds4pgYqtVgLIVDCaG+aClg1P5vVO3C9KQmTBWt6qvMnxA8PM5PQdEyjz43abFK5Y9CK+qXZPMPRUjkFljtFnkZog2ynZLuF8W/I8+hKZxt+3dXjOzM8biZ7UrDM5TCNb9mnABOyX3S3xEkRFEGEWszYwYyCmgJMqsL0cyQilBFhDo7qiI8d3qtJnaJfeCsWe7HssXAG8kWhQXCbLnD6J1KPhKTcC1lk9SvON6GIi8l2IUSAuguOBHQKCeL4T6Jg8ofI2PomSOAOCNtr/ACKtfheTlfRO+gCrXA2UH+qc8GkqVvqg1Rxd3JXxUgC+qaX/AGQGXj82+yhlQ+N7KLxNjnOJrRBRYgF2rZxHHDeiBxsIkmxpYpRo0oSSY5A216LvhvB3OPM7ZW0cNadSF2YwBQFBAPICjgDRXZCzM7pk8DclLMjJ1+FFM4GkYemiAnB6m/JTZOT0tLsqYDqusNHOQ/Ty/ulkxJY6taRczA6jZUDmAWNgu5ASpiGR9f57FPOAcVBPs3nXofPsl80LQDaUT/C4OBot1H0VITOnBSR6UtpfwTOEsTXg6gU5MAtsXaswSXF0zhx1XHEHVG4nsgG5lz8qO4sP5TvRUgyUyoRPNmijY8l4S2MOHQ7o2EHqCq86JuLYX789YoeQ9isXeRA8bLdO74T6JFwacNld/UjePZHJEfNVbCzNQethYWbopF+XdqGM21p7hdAooV9m3FCZslNKIeUp43KQE8BbI+E5JDi3o5O43lp9FVcJx52nsQrTK2iPMWjko4u3B8kPjHcIuUaKs+GJ6eQToVaSLCjNWg2IOKNuh5rBFTR3U/EGaqHBLnn0WSRqT0Hcvwj0S/LJqkfkvoJNPkWlGgrIp3AA2kmVkb/ZT5OUdb7pNlS3Z7aoFaMkfpqluTKL39VNK/mbogfd3E2aKYAWzIAA7dFjxzbdUMeopEwvAA8t0rOFuXDynyOiS5oNnsNPurJlnmBrbceqR5sJ26kWnixifwXxIMkMb/ldf91dJOKRDoV5fAS14PZwP0VvaHuotbYICq8skqiiTxxk7YwdxWBruYN1XE3iRpFcqVOw5XOrl1Uk3AZQ2zQpKpZpdIbhhXbJDxdvRo+wUZ4x5BKRgv6FZHgvLtUeGdhvAhv+MH9K0hfcHLa7x5jueAsniSLmZQVdxOHuseo/urjmsBag+FQ88jW9irZJU9GCI4DOVjB5BZalziOehsBSgCpF2hWael/EorCYOQ+Q2wunqOgIAwMW3tATzNbTq7BQeH2AOLj0Gi6yJLeT5qWGTb2MzvHlLSCD1V24blh7RrrSoYTLhGbyOFndVmvsBFh4w74SfVccGH8vm6ld58gLBpYKnxWUwUK02WFrZp/5Bc3zP0SbN27BO5m2q/xUtF3aVl8QizcgDzS59k66AojKlafol7p7I8jSCGJJJA0V02WNi1GtKJ4ur2tEaUNdkQG2Yw1vUnZDyGrBCJkm2S/iMvxfRBhRC2Uix5oHNmF39FkmSQa6n9kJM3mBHYfunSCxdmupwcNrr7q8cI4qxsLObelQMkkh3lX3Cs/CmgxNNXaq5uPoThyHj+Nxh3NS4yPEIc0t5Tqlnw3QrmvULUjHNv4TXogvk5PSO+mg+2ce9Vs1Y7iTh+RQST30XDWOeaAR8uZ+jvDhRN+LP/SsW/wiTsFiPkzfY7x4C9S7FLOFZHJMT9EdlvppSiFhBvzV5OKezz06LC91knubWWo27AroFN/gDZQ2S+mlEEpdxRxqgu1WzkRcM4hTyO6Zn/lV6LHPM0+ascrKDT3CWFBbs5tbY6iuFoqoEWvhc/OzXonbB8IVU8PP3HmrYdBSxTWy7sEytiq1xPXdWLJKrHGMggkALOzTiKzlEAn9ksbPqdNL0THNm6pJJIfiP0C5FKCMh5RDJgR6JWMk3yntupmSGt09AoMklApCzS2UO55JItcskokEoUEAypCDt6KH24ugfVS5Lq131KAncAQe6pHZxFO3Q+avHhKNpx7IutlRJXaH1XoXgqG8Ueva1aP5I5L9FW4dMfxFzT8vQK98abUR2ukHB4WibOZ7PN2uk5nja4UQKWiM4RMjxZJHnrUZgn4xofsrS3hMH6Ap48WNvRo+yWWaIV8afsW+3HY/ZbTWmf0rEvnQ30siHK2QoajMgaIVupA7kLNnTcyDTGlfy2lc2ic1vK1jfJCtYegJWqFcRlFmEoTKajfYv/SfsuJsCU7NQn0dTAoGix67JvxFtBiGweHSB7S6g0H6phn4xe6wRQCjj0wxxtiq1u0wbwzu5bGA3va0OY3idhnhdupVtekHAYGtOifvWaQWmmLs0ClVuLkUVZ81pOyrnEMU691maNeIp/EA47aBV+exe9lWjiEYGlqvZjTeg0XIoLnykafdRDNdXopcgEWSgyaNdCrI5hHvel7E91t89i+qEyGgkEdNFLE8DetEWgWbce5Q2VR+i6fKFCBodVyBZqXVo7WF6Z4Mx3nGYWjQ31rqvMpW/D+/2Xs3gePkw4h3BP7pmcmSfh8vXlH1Wfh7v1C/RN3kLm2/VLY6f2FkWC0fMST9lMOFRnUWfK0b7MHalyYq1BpIxrYN+Es/T+60ieZ3daQo7Yv4NiskeWvBIATf8KjBtrNtkt8PSNbIbNdlaWix/wC0q5m+Rgx00Knw/wBIPqpI2eTR9AjpYAUHI0hKpFlROGCuiEyYT+Q/6Tusjya3U/M0opnUANjcdy3/AHUzccdXfsES5oP+QuC2uiPIJC7AB2c70pL88sgBc6/qmvP/APAqb/EfJfyNAOhTQ26A3Q54Bxxr36d+iuzdQvC/COe1kotx3+69p4XlBzAep1APZUyQM8uzWcNNFW+IP6Eq05lEH0VOy2W8t1JWWSZfExPxBjSdrtIMptOqlbMrGN3sB33SPKhBcSe6maLKvnNN6bBAyHWqVgz4RegSmeMdk0ZHCrMdqK0rdCOPc1aNlgu1H7sDv0VuSEaIWgnTspWxXsjMbFA1K7+EWhyR1AT4+ZzGDdxql7VwyEshjbtTB/ZeV+GcQS5kY7ar2FraFHpoja+4yVHLSQsJWOaoyV2jjs+q17chRF3muCe6WVDJBPvXkFiEsLEgaFd/8FOuEcYe0hr9W/2SO13iP+MLVnSezx+bRfYshjxbTY6hbkjCo7Mh7JCQ6rKteNxEV8WmmrjssuSPCma8dyR2/DB16oGSNwOycWCAWmwaII21XMjb0K5TKKQrZN3UrX+a3NhEajUf2QxsJ1sdUyR7PoVX/GHDnSwmhq3UJ6X0o5phXcdR5Jk+Ls6Ub0jwCXJfHJoaIJr1CsfB/Gc0IcS9znOFNB6I/wAZeG2OcZYd71avP87HkYac019lp8kJLvZBxa9F2n/iHlO0DqDavz7onwz43e7I/nH4TWvkvM3PI6qL3ojyKRwsCdH1BkiKaPnic13MO40VYzYq7E9V43ieKMiMNDJHAN10JUmT4xyXCuci9b6qMsDHWQ9DyWjXUfdJMx7RZJFeoVCl43O67kJvzQUmS927j9yuXxvyH6hIuuRxKMCgRaHZmXsRSp3Mttee5+6p4kT+oLuzKb1fr5Lolp2Kp0WQ4G00x84bk6pXjSKxypnoHgqm5Bk3AYRp5q+/izBuD9V5R4U4rUoaBfNuQr82T9+6viwQkhJ5Wh83iTN6sLr3+M6HRV0x18pLSuTOR87f9TdkX8ZJ6FWZlgklbuDohhlN6JbHLerXAj912ZWncUe/VDxIbysY+8+i2lPIz9Tli7wxO8rO7U2EPjCGJU2H8wSZ/RifR1kn+YfVNeKNvGkB/wC3Y8jST5R+M+qeSN5oiO8f+yzfM1GJv+H7D+Cuc2CEWTUTP/FNY5QUrwDUbAejGj9kYDosiZacQwtvZQ5GODvotMn5RrqFOyRrhY1VoyM9NMVSwEdLCCyID6J+6Eg2NR2WpMcHpafneisctFCzIZbNM07pXPw1slCaJpHU1qvQcnCrcaIGfCaVnnjlF2jXDJjktlAzf4f4U2sb3Ru7XoqvxT+HEke0ljvRK9Vn4cAdFjHOHwu1Hmp/V5o6s54MT2eLDwLkfle0j7IeTwRm7hod6EL2vJ4Sx45mU13YdUAcWRh10rt1TL52ZbYv0mNnjcng7NAv2RPeiNEBLwXIbvG77L32F5O7UNl4jDu3lPQDYqi/UZe0J9BC+zwlvCZz+Qrv8Hm35TS9im4KB8TNO4vQob3PWnNAPfouf6i/SH/b4Hl2NwQn5jX0KYQ+Hq3BNdei9AOC3q0eqJxMUN7EJP3CT9FF8KKK3wPCDDo0A91Z4A4bGz5/7I+GOA0CG35BMo+HN6UR5K2H5tEcvxhQ2bXUEH9lKGE9k3GAw6fsVg4SN2kgfpK3r5aZleChE/EF3VHuFqnjf4x5bhOpcIj/AAom4x6b9Qm80QLCK+cfpd9wsTP3c9liHlQfCAqfE+YLaxLn9GB9EeX8x9VYIv8Ap/6P9ltYs3zf6xNvw/YVH8jfRqNPyhbWLJE1SND5Cs4esWJ0RmMGLUfzLSxNHsicZqWOWLE8uh8YHOhJtlixYMvZ6WPo3hrni+w9VixKuh/YDi9UPlrFiD6E9mN2CD4v8oWLEhqgQO+X6KGDqsWIIoyXE+cK3cO+U/RYsXY+zPkOzujFtYt8THMgl6IBvzlaWLSgIlWLFiIT/9k="
                />
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  pt={3}
                  pl={1}
                  pr={1}
                >
                  <Icon name="chat" mr={1} />
                  <Text fontSize="lg" textAlign="center" fontStyle="italic">
                    {value.getName()}
                  </Text>
                </Box>
              </Box>;
            })}
          </Box>
        </SimpleGrid>
      </Box>
    );
  }
}

export default FeaturedCats;
