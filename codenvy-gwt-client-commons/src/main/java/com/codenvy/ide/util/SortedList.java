// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.codenvy.ide.util;

import com.codenvy.ide.collections.Array;
import com.codenvy.ide.collections.Collections;
import com.codenvy.ide.runtime.Assert;


/**
 * List that is sorted based on the given {@link Comparator}.
 * <p/>
 * Insertions and removal of an instance are O(N).
 */
public class SortedList<T> {

    /**
     * Compares two items and returns a value following the same contract as
     * {@link Comparable#compareTo(Object)}.
     *
     * @param <T>
     *         the type of the items being compared
     */
    public interface Comparator<T> {
        int compare(T a, T b);
    }

    /**
     * Compares some (opaque) value to other items' values. This can be used to
     * efficiently find an item based on a value.
     *
     * @param <T>
     *         the type of items being compared
     */
    public interface OneWayComparator<T> {
        int compareTo(T o);
    }

    /** Simple {@link SortedList.OneWayComparator} that has an int-based value. */
    public abstract static class OneWayIntComparator<T> implements OneWayComparator<T> {
        protected int value;

        public void setValue(int value) {
            this.value = value;
        }
    }

    /** Simple {@link SortedList.OneWayComparator} that has a double-based value. */
    public static abstract class OneWayDoubleComparator<T> implements SortedList.OneWayComparator<T> {
        protected double value;

        public void setValue(double value) {
            this.value = value;
        }
    }

    private final class ComparatorDelegator implements OneWayComparator<T> {
        T a;

        @Override
        public int compareTo(T o) {
            return comparator.compare(a, o);
        }
    }

    private static final boolean ENSURE_SORTED_PRECONDITIONS_ENABLED = false;

    private final Array<T> array;

    private final Comparator<T> comparator;

    private final ComparatorDelegator comparatorDelegator = new ComparatorDelegator();

    public SortedList(Comparator<T> comparator) {
        this.array = Collections.createArray();
        this.comparator = comparator;
    }

    /**
     * Adds an item to the list. Performance is O(lg N).
     *
     * @param item
     *         item to add
     * @return index at which item was added into the list
     */
    public int add(T item) {
        int index = findInsertionIndex(item);
        array.splice(index, 0, item);
        ensureSortedIfEnabled();
        return index;
    }

    /** Clears the list. */
    public void clear() {
        array.clear();
    }

    /**
     * Returns the first item in the list matched by the comparator, or null if
     * there were no matches.
     */
    public T find(OneWayComparator<T> comparator) {
        int index = findInsertionIndex(comparator);
        if (index < size()) {
            T item = get(index);
            if (comparator.compareTo(item) == 0) {
                return item;
            }
        }

        return null;
    }

    /**
     * Returns the index where the item with the value would be inserted. The
     * actual value is unknown to this method; it delegates comparison to the
     * given {@code comparator}.
     * <p/>
     * If an item with the same value already exists in the list, the returned
     * index will be the first appearance of the value in the list. If the value
     * does not exist in the list, the returned index will be the first value
     * greater than the value being compared, or the size of the list if there is
     * no greater value.
     * <p/>
     * An alternate approach to the OneWayComparator used here is to have the
     * SortedList take another type parameter for the type of the value, and have
     * a findInsertionIndex(V value) method. Unfortunately, it is common to have
     * primitives for the value, so we would be boxing unnecessarily.
     *
     * @see #findInsertionIndex(OneWayComparator, boolean)
     */
    public int findInsertionIndex(OneWayComparator<T> comparator) {
    /*
     * Return the greater value, since that will be the insertion index.
     * Remember that if we get here, lower > upper (look at the while loop
     * above).
     */
        return findInsertionIndex(comparator, true);
    }

    /**
     * Returns the index where the item with the value would be inserted. The
     * actual value is unknown to this method; it delegates comparison to the
     * given {@code comparator}.
     * <p/>
     * If an item with the same value already exists in the list, the returned
     * index will be the first appearance of the value in the list. If the value
     * does not exist in the list, see {@code greaterItemIfNoMatch}.
     *
     * @param greaterItemIfNoMatch
     *         in the case that the given comparator's value
     *         does not match an item in the list exactly, this parameter defines
     *         which of the items to return. If true, the item that is greater than
     *         the comparator's value will be returned. If false, the item that is
     *         less than the comparator's value will be returned.
     */
    public int findInsertionIndex(OneWayComparator<T> comparator, boolean greaterItemIfNoMatch) {
        int insertionPoint = binarySearch(array, comparator);
        if (insertionPoint >= 0) {
            return insertionPoint;
        }
        insertionPoint = -insertionPoint - 1;
        return greaterItemIfNoMatch ? insertionPoint : insertionPoint - 1;
    }


    /** @see #findInsertionIndex(OneWayComparator) */
    public int findInsertionIndex(final T item) {
        comparatorDelegator.a = item;
        return findInsertionIndex(comparatorDelegator);
    }

    /**
     * Finds index of a given item in the list, or {@code -1}, if not found.
     *
     * @param item
     *         the item to search for
     * @return index of item in the list, or {@code -1} if not found
     */
    public int findIndex(T item) {
        for (int i = findInsertionIndex(item); i < array.size()
                                               && comparator.compare(item, array.get(i)) == 0; i++) {
            if (array.get(i).equals(item)) {
                return i;
            }
        }
        return -1;
    }

    /** Returns the item at the given {@code index}. */
    public T get(int index) {
        return array.get(index);
    }

    /** Removes the item at the given {@code index}. */
    public T remove(int index) {
        T item = array.remove(index);
        ensureSortedIfEnabled();
        return item;
    }

    /** Removes the items starting at {@code index} through to the end. */
    public Array<T> removeThisAndFollowing(int index) {
        Array<T> items = removeSublist(index, array.size() - index);
        ensureSortedIfEnabled();
        return items;
    }

    /** Removes the items starting at {@code index} through to the end. */
    public Array<T> removeSublist(int index, int sublistSize) {
        Array<T> sublist = array.splice(index, sublistSize);
        ensureSortedIfEnabled();
        return sublist;
    }

    /** Removes the given {@code item}. Performance is O(lg N). */
    public boolean remove(T item) {
        int index = findIndex(item);
        if (index >= 0) {
            array.remove(index);
            ensureSortedIfEnabled();
            return true;
        }
        return false;
    }

    /** @return the size of this list */
    public int size() {
        return array.size();
    }

    /** @return copy of this list as an array */
    public Array<T> toArray() {
        return array.copy();
    }

    /**
     * Ensures that the item that is currently at index {@code index} is
     * positioned properly in the list.
     * <p/>
     * If an item was changed and its position could now be stale, you should call
     * this method.
     */
    public void repositionItem(int index) {
        // TODO: naive impl
        T item = remove(index);
        ensureSortedIfEnabled();
        add(item);
        ensureSortedIfEnabled();
    }

    public static <T> int binarySearch(Array<T> array, OneWayComparator<T> comparator) {
        int lower = 0;
        int upper = array.size() - 1;

        while (lower <= upper) {
            int middle = lower + (upper - lower) / 2;
            int c = comparator.compareTo(array.get(middle));
            if (c < 0) {
                upper = middle - 1;
            } else if (c > 0) {
                lower = middle + 1;
            } else {
        /*
         * We have an exact match at middle, but there may be more exact matches
         * before us, so we want to find the first exact match.
         */

                // Move backward to the first non-equal value
                int i = middle;
                while (i >= 0 && comparator.compareTo(array.get(i)) == 0) {
                    i--;
                }

                // Forward one to the first equal value
                return i + 1;
            }
        }
        return -lower - 1;
    }

    public final void ensureSortedIfEnabled() {
        if (ENSURE_SORTED_PRECONDITIONS_ENABLED) {
            for (int i = 1; i < array.size(); i++) {
                Assert.isTrue(comparator.compare(array.get(i - 1), array.get(i)) <= 0);
            }
        }
    }
}
