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
package com.codenvy.ide.runtime;

/**
 * <code>Assert</code> is useful for for embedding runtime sanity checks in code. The predicate methods all test a condition and
 * throw some type of unchecked exception if the condition does not hold.
 * <p>
 * Assertion failure exceptions, like most runtime exceptions, are thrown when something is misbehaving. Assertion failures are
 * invariably unspecified behavior; consequently, clients should never rely on these being thrown (and certainly should not be
 * catching them specifically).
 * </p>
 * <p>
 * This class can be used without OSGi running.
 * </p>
 * <p>
 * This class is not intended to be instantiated or sub-classed by clients.
 * </p>
 *
 * @noinstantiate This class is not intended to be instantiated by clients.
 * @since org.eclipse.equinox.common 3.2
 */
public final class Assert {
    /* This class is not intended to be instantiated. */
    private Assert() {
        // not allowed
    }

    /**
     * Asserts that an argument is legal. If the given boolean is not <code>true</code>, an <code>IllegalArgumentException</code>
     * is thrown.
     *
     * @param expression
     *         the outcome of the check
     * @return <code>true</code> if the check passes (does not return if the check fails)
     * @throws IllegalArgumentException
     *         if the legality test failed
     */
    public static boolean isLegal(boolean expression) {
        return isLegal(expression, ""); //$NON-NLS-1$
    }

    /**
     * Asserts that an argument is legal. If the given boolean is not <code>true</code>, an <code>IllegalArgumentException</code>
     * is thrown. The given message is included in that exception, to aid debugging.
     *
     * @param expression
     *         the outcome of the check
     * @param message
     *         the message to include in the exception
     * @return <code>true</code> if the check passes (does not return if the check fails)
     * @throws IllegalArgumentException
     *         if the legality test failed
     */
    public static boolean isLegal(boolean expression, String message) {
        if (!expression)
            throw new IllegalArgumentException(message);
        return expression;
    }

    /**
     * Asserts that the given object is not <code>null</code>. If this is not the case, some kind of unchecked exception is thrown.
     *
     * @param object
     *         the value to test
     */
    public static void isNotNull(Object object) {
        isNotNull(object, ""); //$NON-NLS-1$
    }

    /**
     * Asserts that the given object is not <code>null</code>. If this is not the case, some kind of unchecked exception is thrown.
     * The given message is included in that exception, to aid debugging.
     *
     * @param object
     *         the value to test
     * @param message
     *         the message to include in the exception
     */
    public static void isNotNull(Object object, String message) {
        if (object == null)
            throw new AssertionFailedException("null argument:" + message); //$NON-NLS-1$
    }

    /**
     * Asserts that the given boolean is <code>true</code>. If this is not the case, some kind of unchecked exception is thrown.
     *
     * @param expression
     *         the outcome of the check
     * @return <code>true</code> if the check passes (does not return if the check fails)
     */
    public static boolean isTrue(boolean expression) {
        return isTrue(expression, ""); //$NON-NLS-1$
    }

    /**
     * Asserts that the given boolean is <code>true</code>. If this is not the case, some kind of unchecked exception is thrown.
     * The given message is included in that exception, to aid debugging.
     *
     * @param expression
     *         the outcome of the check
     * @param message
     *         the message to include in the exception
     * @return <code>true</code> if the check passes (does not return if the check fails)
     */
    public static boolean isTrue(boolean expression, String message) {
        if (!expression)
            throw new AssertionFailedException("assertion failed: " + message); //$NON-NLS-1$
        return expression;
    }
}
