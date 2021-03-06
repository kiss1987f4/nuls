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

package io.nuls.network.netty.message.handler;

import io.nuls.network.model.NetworkEventResult;
import io.nuls.network.model.Node;
import io.nuls.network.netty.container.NodesContainer;
import io.nuls.network.netty.manager.NodeManager;
import io.nuls.network.protocol.handler.BaseNetworkMeesageHandler;
import io.nuls.network.protocol.message.NodeMessageBody;
import io.nuls.network.protocol.message.NodesMessage;
import io.nuls.protocol.message.base.BaseMessage;

import java.util.*;

public class GetNodesMessageHandler implements BaseNetworkMeesageHandler {

    private static GetNodesMessageHandler instance = new GetNodesMessageHandler();

    private GetNodesMessageHandler() {
    }

    public static GetNodesMessageHandler getInstance() {
        return instance;
    }


    private NodeManager nodeManager = NodeManager.getInstance();

    @Override
    public NetworkEventResult process(BaseMessage message, Node node) {
        List<Node> nodeList = getAvailableNodes();
        NodeMessageBody body = new NodeMessageBody();
        body.setNodeList(nodeList);
        NodesMessage nodesMessage = new NodesMessage(body);
        return new NetworkEventResult(true, nodesMessage);
    }

    private List<Node> getAvailableNodes() {

        NodesContainer nodesContainer = nodeManager.getNodesContainer();

        Map<String, Node> canConnectNodes = nodesContainer.getCanConnectNodes();
        Map<String, Node> connectedNodes = nodesContainer.getConnectedNodes();

        List<Node> nodeList = new ArrayList<>();

        for (Node node : canConnectNodes.values()) {
            Node newNode = new Node();
            newNode.setIp(node.getIp());
            newNode.setPort(node.getPort());
            nodeList.add(newNode);
        }

        for (Node node : connectedNodes.values()) {

            if (node.getType() == Node.IN) {
                continue;
            }

            Node newNode = new Node();
            newNode.setIp(node.getIp());
            newNode.setPort(node.getPort());
            nodeList.add(newNode);
        }

        Collections.shuffle(nodeList);

        return nodeList;
    }
}
