import { useState, useEffect } from "react";
import { addresses, TOKEN_DECIMALS } from "../../constants";
import { getTokenImage } from "../../helpers";
import { useSelector } from "react-redux";
import {
  Link,
  SvgIcon,
  Popper,
  Button,
  Paper,
  Typography,
  Divider,
  Box,
  Fade,
  Slide,
} from "@material-ui/core";
import { ReactComponent as InfoIcon } from "../../assets/icons/info-fill.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as sOhmTokenImg } from "../../assets/tokens/token_sOHM.svg";
import { ReactComponent as ohmTokenImg } from "../../assets/tokens/token_OHM.svg";

import "./ohmmenu.scss";
// import { dai, frax } from "src/helpers/AllBonds";
import { dai } from "src/helpers/AllBonds";
import { useWeb3Context } from "../../hooks/web3Context";

import OhmImg from "src/assets/tokens/SEA.svg";
import SOhmImg from "src/assets/tokens/WAVE.svg";
import TokenSymbol from "../TokenSymbol";
import styled from "styled-components";

const addTokenToWallet = (tokenSymbol, tokenAddress) => async () => {
  if (window.ethereum) {
    const host = window.location.origin;
    // NOTE (appleseed): 33T token defaults to sOHM logo since we don't have a 33T logo yet
    const tokenPath = tokenSymbol === "SEA" ? OhmImg : SOhmImg;
    const imageURL = `${host}/${tokenPath}`;

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: TOKEN_DECIMALS,
            image: imageURL,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

function OhmMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;
  const { chainID } = useWeb3Context();

  const networkID = chainID;

  const WAVE_ADDRESS = addresses[networkID].WAVE_ADDRESS;
  const SEA_ADDRESS = addresses[networkID].SEA_ADDRESS;

  const PT_TOKEN_ADDRESS = addresses[networkID].PT_TOKEN_ADDRESS;

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = "ohm-popper";
  // console.log('alex: networkID = ', networkID);
  const daiAddress = dai.getAddressForReserve(networkID);
  // const fraxAddress = frax.getAddressForReserve(networkID);
  return (
    <Box
      component="div"
      onMouseEnter={(e) => handleClick(e)}
      onMouseLeave={(e) => handleClick(e)}
      id="ohm-menu-button-hover"
    >
      <Button
        id="ohm-menu-button"
        size="large"
        variant="contained"
        color="secondary"
        title="SEA"
        aria-describedby={id}
      >
        <SvgIcon component={InfoIcon} color="primary" />
        <Typography>SEA</Typography>
      </Button>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className="ohm-menu" elevation={1}>
                <Box component="div" className="buy-tokens">
                  <Link
                    href={`https://swap-testnet.bitdeep.dev/swap?inputCurrency=${daiAddress}&outputCurrency=${SEA_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      size="large"
                      variant="contained"
                      color="secondary"
                      fullWidth
                    >
                      <Typography align="left">
                        Buy on PancakeSwap{" "}
                        <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link>

                  <Link
                    href={`https://swap-testnet.bitdeep.dev/#/add/${daiAddress}/${SEA_ADDRESS}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      size="large"
                      variant="contained"
                      color="secondary"
                      fullWidth
                    >
                      <Typography align="left">
                        Get SEA-USDT LP{" "}
                        <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link>

                  {/* <Link href={`https://abracadabra.money/pool/10`} target="_blank" rel="noreferrer">
                    <Button size="large" variant="contained" color="secondary" fullWidth>
                      <Typography align="left">
                        Wrap sOHM on Abracadabra <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link> */}
                </Box>

                {isEthereumAPIAvailable ? (
                  <Box className="add-tokens">
                    <Divider color="secondary" />
                    <p>ADD TOKEN TO WALLET</p>
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={addTokenToWallet("SEA", SEA_ADDRESS)}
                      >
                        <TokenIcon size={32} symbol="SEA" />
                        <Typography variant="body1">SEA</Typography>
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={addTokenToWallet("WAVE", WAVE_ADDRESS)}
                      >
                        <TokenIcon size={32} symbol="WAVE" />
                        <Typography variant="body1">WAVE</Typography>
                      </Button>
                    </Box>
                  </Box>
                ) : null}

                {/* <Divider color="secondary" /> */}
                {/* <Link
                  href="https://docs.olympusdao.finance/using-the-website/unstaking_lp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="large" variant="contained" color="secondary" fullWidth>
                    <Typography align="left">Unstake Legacy LP Token</Typography>
                  </Button>
                </Link> */}
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </Box>
  );
}

export default OhmMenu;

const TokenIcon = styled(TokenSymbol)``;
