/*
 * CODENVY CONFIDENTIAL
 * __________________
 * 
 * [2012] - [$today.year] Codenvy, S.A. 
 * All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Codenvy S.A. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Codenvy S.A.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Codenvy S.A..
 */
package com.codenvy.ide.websocket.rest;

/**
 * String unmarshaller for websocket messages.
 *
 * @author Artem Zatsarynnyy
 */
import com.codenvy.ide.websocket.Message;

/** Deserializer for responses body. */
public class StringUnmarshallerWS implements Unmarshallable<String> {
    protected String builder;

    /** {@inheritDoc} */
    @Override
    public void unmarshal(Message message) {
        builder = message.getBody();
    }

    /** {@inheritDoc} */
    @Override
    public String getPayload() {
        return builder;
    }
}
