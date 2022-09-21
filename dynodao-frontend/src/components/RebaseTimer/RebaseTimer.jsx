import { useSelector, useDispatch } from "react-redux";
import {
  getRebaseBlock,
  secondsUntilBlock,
  prettifySeconds,
  forceRebase,
} from "../../helpers";
import { Box, Typography } from "@material-ui/core";
import "./rebasetimer.scss";
import { Skeleton } from "@material-ui/lab";
import { useEffect, useMemo, useState } from "react";
import { loadAppDetails } from "../../slices/AppSlice";
import { useWeb3Context } from "../../hooks/web3Context";
//
import { abi as OlympusStakingv2 } from "../../abi/OlympusStakingv2.json";
import { ethers } from "ethers";
import { addresses } from "../../constants";

function RebaseTimer() {
  const dispatch = useDispatch();
  const { provider, chainID } = useWeb3Context();

  const SECONDS_TO_REFRESH = 60;
  const [secondsToRebase, setSecondsToRebase] = useState(0);
  const [rebaseString, setRebaseString] = useState("");
  const [secondsToRefresh, setSecondsToRefresh] = useState(SECONDS_TO_REFRESH);

  const currentBlock = useSelector((state) => {
    return state.app.currentBlock;
  });
  const endBlock = useSelector((state) => {
    return state.app.endBlock;
  });

  function initializeTimer() {
    const rebaseBlock = getRebaseBlock(currentBlock);
    const seconds = secondsUntilBlock(currentBlock, endBlock);
    console.log("alex: currentBlock = ", currentBlock);
    console.log("alex: endBlock = ", endBlock);
    setSecondsToRebase(seconds);
    const prettified = prettifySeconds(seconds);
    setRebaseString(prettified !== "" ? prettified : "Less than a minute");

    // console.error({currentBlock,rebaseBlock})
  }

  function rebase() {
    forceRebase({ networkID: chainID, provider: provider });
  }

  // This initializes secondsToRebase as soon as currentBlock becomes available
  useMemo(() => {
    if (currentBlock) {
      initializeTimer();
    }
  }, [currentBlock]);

  //From Viktor : Rebase automatically
  // useEffect(() => {
  //   if (secondsToRebase < 0) {
  //     rebase();
  //     async function reload() {
  //       await dispatch(
  //         loadAppDetails({ networkID: chainID, provider: provider })
  //       );
  //     }
  //     reload();
  //   }
  // }, [secondsToRebase]);

  // After every period SECONDS_TO_REFRESH, decrement secondsToRebase by SECONDS_TO_REFRESH,
  // keeping the display up to date without requiring an on chain request to update currentBlock.
  useEffect(() => {
    let interval = null;
    if (secondsToRefresh > 0) {
      interval = setInterval(() => {
        setSecondsToRefresh((secondsToRefresh) => secondsToRefresh - 1);
      }, 1000);
    } else {
      // When the countdown goes negative, reload the app details and reinitialize the timer
      if (secondsToRebase < 0) {
        async function reload() {
          await dispatch(
            loadAppDetails({ networkID: chainID, provider: provider })
          );
        }
        reload();
        setRebaseString("");
      } else {
        clearInterval(interval);
        setSecondsToRebase(
          (secondsToRebase) => secondsToRebase - SECONDS_TO_REFRESH
        );
        setSecondsToRefresh(SECONDS_TO_REFRESH);
        const prettified = prettifySeconds(secondsToRebase);
        setRebaseString(prettified !== "" ? prettified : "Less than a minute");
      }
    }
    return () => clearInterval(interval);
  }, [secondsToRebase, secondsToRefresh]);

  return (
    <Box className="rebase-timer">
      <Typography variant="body2">
        {currentBlock ? (
          secondsToRebase > 0 ? (
            <>
              <strong>{rebaseString}</strong> to next rebase
            </>
          ) : (
            <strong>rebasing</strong>
          )
        ) : (
          <Skeleton width="155px" />
        )}
      </Typography>
    </Box>
  );
}

export default RebaseTimer;
