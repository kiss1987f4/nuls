package io.nuls.account.event.handler;

import io.nuls.account.entity.event.AliasEvent;
import io.nuls.account.entity.tx.AliasTransaction;
import io.nuls.core.constant.SeverityLevelEnum;
import io.nuls.core.exception.NulsException;
import io.nuls.core.exception.NulsRuntimeException;
import io.nuls.core.utils.log.Log;
import io.nuls.core.validate.ValidateResult;
import io.nuls.event.bus.event.handler.AbstractNetworkNulsEventHandler;
import io.nuls.event.bus.event.service.intf.EventService;
import io.nuls.ledger.service.intf.LedgerService;
import io.nuls.network.service.NetworkService;

/**
 * @author vivi
 * @date 2017/12/18.
 */
public class AliasEventHandler extends AbstractNetworkNulsEventHandler<AliasEvent> {

    private static AliasEventHandler handler = new AliasEventHandler();

    private AliasEventHandler() {
    }

    public static AliasEventHandler getInstance() {
        return handler;
    }

    private EventService eventService;

    private LedgerService ledgerService;

    public void setEventService(EventService eventService) {
        this.eventService = eventService;
    }

    public void setLedgerService(LedgerService ledgerService) {
        this.ledgerService = ledgerService;
    }

    @Override
    public void onEvent(AliasEvent event, String fromId)   {
        AliasTransaction tx = event.getEventBody();
        ValidateResult result = tx.verify();
        if (result.isFailed()) {
            if (SeverityLevelEnum.FLAGRANT.equals(result.getLevel())) {
               // networkService.removePeer(fromId);
            }
            return;
        }

        try {
            ledgerService.verifyAndCacheTx(tx);
        } catch (NulsException e) {
            Log.error(e);
            throw new NulsRuntimeException(e);
        }
        eventService.broadcastHashAndCache(event, fromId);
    }
}
