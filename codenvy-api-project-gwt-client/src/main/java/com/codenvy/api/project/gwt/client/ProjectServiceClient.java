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
package com.codenvy.api.project.gwt.client;

import com.codenvy.api.project.shared.dto.ImportSourceDescriptor;
import com.codenvy.api.project.shared.dto.ItemReference;
import com.codenvy.api.project.shared.dto.ProjectDescriptor;
import com.codenvy.api.project.shared.dto.ProjectReference;
import com.codenvy.api.project.shared.dto.TreeElement;
import com.codenvy.ide.collections.Array;
import com.codenvy.ide.collections.StringMap;
import com.codenvy.ide.rest.AsyncRequestCallback;

/**
 * Client for Project service.
 *
 * @author Vitaly Parfonov
 * @author Artem Zatsarynnyy
 */
public interface ProjectServiceClient {

    /**
     * Get all projects.
     *
     * @param callback
     *         the callback to use for the response
     */
    public void getProjects(AsyncRequestCallback<Array<ProjectReference>> callback);

    /**
     * Get project.
     *
     * @param path
     *         path to the project to get
     * @param callback
     *         the callback to use for the response
     */
    public void getProject(String path, AsyncRequestCallback<ProjectDescriptor> callback);

    /**
     * Create project.
     *
     * @param name
     *         name of the project to create
     * @param descriptor
     *         descriptor of the project to create
     * @param callback
     *         the callback to use for the response
     */
    public void createProject(String name, ProjectDescriptor descriptor, AsyncRequestCallback<ProjectDescriptor> callback);

    /**
     * Get sub-project.
     *
     * @param path
     *         path to the parent project
     * @param callback
     *         the callback to use for the response
     */
    public void getModules(String path, AsyncRequestCallback<Array<ProjectDescriptor>> callback);

    /**
     * Create sub-project.
     *
     * @param parentProjectPath
     *         path to the parent project
     * @param name
     *         name of the module to create
     * @param descriptor
     *         descriptor of the project to create
     * @param callback
     *         the callback to use for the response
     */
    public void createModule(String parentProjectPath, String name, ProjectDescriptor descriptor,
                             AsyncRequestCallback<ProjectDescriptor> callback);

    /**
     * Update project.
     *
     * @param path
     *         path to the project to get
     * @param descriptor
     *         descriptor of the project to update
     * @param callback
     *         the callback to use for the response
     */
    public void updateProject(String path, ProjectDescriptor descriptor, AsyncRequestCallback<ProjectDescriptor> callback);

    /**
     * Create new file in the specified folder.
     *
     * @param parentPath
     *         path to parent for new file
     * @param name
     *         file name
     * @param content
     *         file content
     * @param contentType
     *         media type of file content
     * @param callback
     *         the callback to use for the response
     */
    public void createFile(String parentPath, String name, String content, String contentType, AsyncRequestCallback<Void> callback);

    /**
     * Get file content.
     *
     * @param path
     *         path to file
     * @param callback
     *         the callback to use for the response
     */
    public void getFileContent(String path, AsyncRequestCallback<String> callback);

    /**
     * Update file content.
     *
     * @param path
     *         path to file
     * @param content
     *         new content of file
     * @param contentType
     *         content media type
     * @param callback
     *         the callback to use for the response
     */
    public void updateFile(String path, String content, String contentType, AsyncRequestCallback<Void> callback);

    /**
     * Create new folder in the specified folder.
     *
     * @param path
     *         path to parent for new folder
     * @param callback
     *         the callback to use for the response
     */
    public void createFolder(String path, AsyncRequestCallback<Void> callback);

    /**
     * Delete item.
     *
     * @param path
     *         path to item to delete
     * @param callback
     *         the callback to use for the response
     */
    public void delete(String path, AsyncRequestCallback<Void> callback);

    /**
     * Copy an item to the specified target path.
     *
     * @param path
     *         path to the item to copy
     * @param newParentPath
     *         path to the target item
     * @param callback
     *         the callback to use for the response
     */
    public void copy(String path, String newParentPath, AsyncRequestCallback<Void> callback);

    /**
     * Move an item to the specified target path.
     *
     * @param path
     *         path to the item to move
     * @param newParentPath
     *         path to the target item
     * @param callback
     *         the callback to use for the response
     */
    public void move(String path, String newParentPath, AsyncRequestCallback<Void> callback);

    /**
     * Rename and/or set new media type for item.
     *
     * @param path
     *         path to the item to rename
     * @param newName
     *         new name
     * @param newMediaType
     *         new media type
     * @param callback
     *         the callback to use for the response
     */
    public void rename(String path, String newName, String newMediaType, AsyncRequestCallback<Void> callback);

    /**
     * Import sources into project.
     *
     * @param path
     *         path to the project to import sources
     * @param importSourceDescriptor
     *         {@link ImportSourceDescriptor}
     * @param callback
     *         the callback to use for the response
     */
    public void importProject(String path, ImportSourceDescriptor importSourceDescriptor,
                              AsyncRequestCallback<ProjectDescriptor> callback);

    /**
     * Generate project.
     *
     * @param path
     *         path to the project to generate
     * @param generatorName
     *         project generator's name
     * @param options
     *         additional options for project generator
     * @param callback
     *         the callback to use for the response
     */
    public void generateProject(String path, String generatorName, StringMap<String> options,
                                AsyncRequestCallback<ProjectDescriptor> callback);

    /**
     * Get children for the specified path.
     *
     * @param path
     *         path to get its children
     * @param callback
     *         the callback to use for the response
     */
    public void getChildren(String path, AsyncRequestCallback<Array<ItemReference>> callback);

    /**
     * Get folders tree starts from the specified path.
     *
     * @param path
     *         path to get its folder tree
     * @param depth
     *         depth for discover children
     * @param callback
     *         the callback to use for the response
     */
    public void getTree(String path, int depth, AsyncRequestCallback<TreeElement> callback);

    /**
     * Search an item(s) by the specified criteria.
     *
     * @param expression
     *         search query expression
     * @param callback
     *         the callback to use for the response
     */
    public void search(QueryExpression expression, AsyncRequestCallback<Array<ItemReference>> callback);
}
