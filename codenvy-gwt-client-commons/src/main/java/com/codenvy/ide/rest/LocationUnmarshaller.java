/*
 * CODENVY CONFIDENTIAL
 * __________________
 *
 * [2012] - [2013] Codenvy, S.A.
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
package com.codenvy.ide.rest;

import com.codenvy.ide.commons.exception.UnmarshallerException;
import com.google.gwt.http.client.Response;

/**
 * Unmarshaller for "Location" HTTP Header.
 * Uses in {@link AsyncRequest} for run REST Service asynchronously.
 *
 * @author Evgen Vidolob
 */
public class LocationUnmarshaller implements Unmarshallable<String> {
    private String result;

    /** {@inheritDoc} */
    public void unmarshal(Response response) throws UnmarshallerException {
        result = response.getHeader("Location");
    }

    /** {@inheritDoc} */
    public String getPayload() {
        return result;
    }
}