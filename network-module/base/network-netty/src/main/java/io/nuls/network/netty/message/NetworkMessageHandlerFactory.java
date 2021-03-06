/*
 * MIT License
 *
 * Copyright (c) 2017-2019 nuls.io
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

package io.nuls.network.netty.message;

import io.nuls.network.netty.message.handler.*;
import io.nuls.network.protocol.handler.BaseNetworkMeesageHandler;
import io.nuls.network.protocol.message.*;
import io.nuls.protocol.message.base.BaseMessage;

import java.util.HashMap;
import java.util.Map;

public class NetworkMessageHandlerFactory {

    private Map<String, BaseNetworkMeesageHandler> handlerMap = new HashMap<>();

    private static NetworkMessageHandlerFactory INSTANCE = new NetworkMessageHandlerFactory();

    public static NetworkMessageHandlerFactory getInstance() {
        return INSTANCE;
    }

    private NetworkMessageHandlerFactory() {
        handlerMap.put(HandshakeMessage.class.getName(), HandshakeMessageHandler.getInstance());
        handlerMap.put(GetVersionMessage.class.getName(), GetVersionMessageHandler.getInstance());
        handlerMap.put(VersionMessage.class.getName(), VersionMessageHandler.getInstance());
        handlerMap.put(GetNodesMessage.class.getName(), GetNodesMessageHandler.getInstance());
        handlerMap.put(NodesMessage.class.getName(), NodesMessageHandler.getInstance());
        handlerMap.put(GetNodesIpMessage.class.getName(), GetNodesIpMessageHandler.getInstance());
        handlerMap.put(NodesIpMessage.class.getName(), NodesIpMessageHandler.getInstance());
        handlerMap.put(P2PNodeMessage.class.getName(), P2pNodeMessageHandler.getInstance());
    }

    public BaseNetworkMeesageHandler getHandler(BaseMessage message) {
        return handlerMap.get(message.getClass().getName());
    }

    public BaseNetworkMeesageHandler getHandler(String handlerKey) {
        return handlerMap.get(handlerKey);
    }
}
