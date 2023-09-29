declare namespace API {
  type addUserInterfaceInToTableUsingGETParams = {
    /** userId */
    userId?: number;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseInterfaceInfoNew_ = {
    code?: number;
    data?: InterfaceInfoNew;
    message?: string;
  };

  type BaseResponseListInterfaceInfoNew_ = {
    code?: number;
    data?: InterfaceInfoNew[];
    message?: string;
  };

  type BaseResponseListInterfaceInfoVo_ = {
    code?: number;
    data?: InterfaceInfoVo[];
    message?: string;
  };

  type BaseResponseListMapStringObject_ = {
    code?: number;
    data?: Record<string, any>[];
    message?: string;
  };

  type BaseResponseListOrderApi_ = {
    code?: number;
    data?: OrderApi[];
    message?: string;
  };

  type BaseResponseListUserInterfaceInfo_ = {
    code?: number;
    data?: UserInterfaceInfo[];
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseObject_ = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponseOrderApi_ = {
    code?: number;
    data?: OrderApi;
    message?: string;
  };

  type BaseResponsePageInterfaceInfoNew_ = {
    code?: number;
    data?: PageInterfaceInfoNew_;
    message?: string;
  };

  type BaseResponsePageUserInterfaceInfo_ = {
    code?: number;
    data?: PageUserInterfaceInfo_;
    message?: string;
  };

  type BaseResponsePageUserInterfaceInfoVo_ = {
    code?: number;
    data?: PageUserInterfaceInfoVo_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUserAKSKVo_ = {
    code?: number;
    data?: UserAKSKVo;
    message?: string;
  };

  type BaseResponseUserInterfaceInfo_ = {
    code?: number;
    data?: UserInterfaceInfo;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type cancelOrderUsingGETParams = {
    /** orderId */
    orderId: number;
  };

  type deleteOrderUsingGETParams = {
    /** orderId */
    orderId: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getAllUserInterfaceInfoByListUsingGETParams = {
    current?: number;
    id?: number;
    interfaceInfoId?: number;
    leftNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    totalNum?: number;
    userId?: number;
  };

  type getInterfaceInfoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getInterfaceInfoListUsingGETParams = {
    current?: number;
    description?: string;
    id?: number;
    invokeCount?: number;
    IPAddress?: string;
    method?: string;
    name?: string;
    pageSize?: number;
    port?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type getLoginUserTokenUsingGETParams = {
    /** token */
    token?: string;
  };

  type getOrderByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getOrderByUserIdUsingGETParams = {
    /** userId */
    userId: number;
  };

  type getTopInvokeInterfaceInfoVoUsingGETParams = {
    /** limit */
    limit?: number;
  };

  type getUserInterfaceInfoByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type IdRequest = {
    id?: number;
  };

  type InterfaceInfoAddRequest = {
    description?: string;
    invokeCount?: number;
    ipaddress?: string;
    method?: string;
    methodName?: string;
    name?: string;
    port?: number;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    sdkPath?: string;
    token?: string;
    url?: string;
  };

  type InterfaceInfoInvokeRequest = {
    id?: number;
    token?: string;
    userRequestParams?: string;
  };

  type InterfaceInfoNew = {
    avatarUrl?: string;
    createTime?: string;
    description?: string;
    id?: number;
    invokeCount?: number;
    ipaddress?: string;
    isDeleted?: number;
    method?: string;
    methodName?: string;
    name?: string;
    port?: number;
    price?: number;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    sdkPath?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoQueryRequest = {
    current?: number;
    description?: string;
    id?: number;
    invokeCount?: number;
    ipaddress?: string;
    method?: string;
    name?: string;
    pageSize?: number;
    port?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoUpdateRequest = {
    avatarUrl?: string;
    description?: string;
    id?: number;
    invokeCount?: number;
    ipaddress?: string;
    method?: string;
    methodName?: string;
    name?: string;
    port?: number;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    sdkPath?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInfoUserQueryRequest = {
    current?: number;
    description?: string;
    id?: number;
    invokeCount?: number;
    ipaddress?: string;
    method?: string;
    name?: string;
    pageSize?: number;
    port?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoVo = {
    avatarUrl?: string;
    createTime?: string;
    description?: string;
    id?: number;
    invokeCount?: number;
    ipaddress?: string;
    isDeleted?: number;
    method?: string;
    methodName?: string;
    name?: string;
    port?: number;
    price?: number;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    sdkPath?: string;
    status?: number;
    totalNum?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type LoginPhoneVo = {
    code?: string;
    phoneNum?: string;
  };

  type logoutUsingDELETEParams = {
    /** token */
    token?: string;
  };

  type ModelAndView = {
    empty?: boolean;
    model?: Record<string, any>;
    modelMap?: Record<string, any>;
    reference?: boolean;
    status?:
      | 'ACCEPTED'
      | 'ALREADY_REPORTED'
      | 'BAD_GATEWAY'
      | 'BAD_REQUEST'
      | 'BANDWIDTH_LIMIT_EXCEEDED'
      | 'CHECKPOINT'
      | 'CONFLICT'
      | 'CONTINUE'
      | 'CREATED'
      | 'DESTINATION_LOCKED'
      | 'EXPECTATION_FAILED'
      | 'FAILED_DEPENDENCY'
      | 'FORBIDDEN'
      | 'FOUND'
      | 'GATEWAY_TIMEOUT'
      | 'GONE'
      | 'HTTP_VERSION_NOT_SUPPORTED'
      | 'IM_USED'
      | 'INSUFFICIENT_SPACE_ON_RESOURCE'
      | 'INSUFFICIENT_STORAGE'
      | 'INTERNAL_SERVER_ERROR'
      | 'I_AM_A_TEAPOT'
      | 'LENGTH_REQUIRED'
      | 'LOCKED'
      | 'LOOP_DETECTED'
      | 'METHOD_FAILURE'
      | 'METHOD_NOT_ALLOWED'
      | 'MOVED_PERMANENTLY'
      | 'MOVED_TEMPORARILY'
      | 'MULTIPLE_CHOICES'
      | 'MULTI_STATUS'
      | 'NETWORK_AUTHENTICATION_REQUIRED'
      | 'NON_AUTHORITATIVE_INFORMATION'
      | 'NOT_ACCEPTABLE'
      | 'NOT_EXTENDED'
      | 'NOT_FOUND'
      | 'NOT_IMPLEMENTED'
      | 'NOT_MODIFIED'
      | 'NO_CONTENT'
      | 'OK'
      | 'PARTIAL_CONTENT'
      | 'PAYLOAD_TOO_LARGE'
      | 'PAYMENT_REQUIRED'
      | 'PERMANENT_REDIRECT'
      | 'PRECONDITION_FAILED'
      | 'PRECONDITION_REQUIRED'
      | 'PROCESSING'
      | 'PROXY_AUTHENTICATION_REQUIRED'
      | 'REQUESTED_RANGE_NOT_SATISFIABLE'
      | 'REQUEST_ENTITY_TOO_LARGE'
      | 'REQUEST_HEADER_FIELDS_TOO_LARGE'
      | 'REQUEST_TIMEOUT'
      | 'REQUEST_URI_TOO_LONG'
      | 'RESET_CONTENT'
      | 'SEE_OTHER'
      | 'SERVICE_UNAVAILABLE'
      | 'SWITCHING_PROTOCOLS'
      | 'TEMPORARY_REDIRECT'
      | 'TOO_EARLY'
      | 'TOO_MANY_REQUESTS'
      | 'UNAUTHORIZED'
      | 'UNAVAILABLE_FOR_LEGAL_REASONS'
      | 'UNPROCESSABLE_ENTITY'
      | 'UNSUPPORTED_MEDIA_TYPE'
      | 'UPGRADE_REQUIRED'
      | 'URI_TOO_LONG'
      | 'USE_PROXY'
      | 'VARIANT_ALSO_NEGOTIATES';
    view?: View;
    viewName?: string;
  };

  type OrderApi = {
    alipayTradeNo?: string;
    buyCount?: number;
    createTime?: string;
    delayTime?: string;
    id?: number;
    interfaceIfoName?: string;
    interfaceInfoId?: number;
    isDelete?: number;
    orderSn?: string;
    price?: number;
    status?: number;
    totalMoney?: number;
    updateTime?: string;
    userId?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type OrderRequest = {
    buyCount?: number;
    interfaceIfoName?: string;
    interfaceInfoId?: number;
    orderSn?: string;
    status?: number;
    totalMoney?: number;
    userId?: number;
  };

  type PageInterfaceInfoNew_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceInfoNew[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserInterfaceInfo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserInterfaceInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserInterfaceInfoVo_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserInterfaceInfoVo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type payUsingGETParams = {
    alipayTraceNo?: string;
    subject?: string;
    totalAmount?: number;
    traceNo?: string;
  };

  type sendCodeUsingGETParams = {
    /** phoneNum */
    phoneNum?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserAKSKVo = {
    accessKey?: string;
    id?: number;
    secretKey?: string;
    token?: string;
  };

  type UserInterfaceInfo = {
    createTime?: string;
    id?: number;
    interfaceInfoId?: number;
    isDelete?: number;
    leftNum?: number;
    status?: number;
    totalNum?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserInterfaceInfoAddRequest = {
    interfaceInfoId?: number;
    leftNum?: number;
    totalNum?: number;
    userId?: number;
  };

  type UserInterfaceInfoCount = {
    interfaceInfoId?: number;
    userId?: number;
  };

  type UserInterfaceInfoQueryRequest = {
    current?: number;
    id?: number;
    interfaceInfoId?: number;
    leftNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    totalNum?: number;
    userId?: number;
  };

  type UserInterfaceInfoUpdateRequest = {
    id?: number;
    leftNum?: number;
    status?: number;
    totalNum?: number;
  };

  type UserInterfaceInfoVo = {
    current?: number;
    id?: number;
    interfaceInfoId?: number;
    interfaceInfoName?: string;
    leftCount?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    totalCount?: number;
    userId?: number;
    userName?: string;
  };

  type UserInterfaceInfoVoRequest = {
    current?: number;
    id?: number;
    interfaceInfoId?: number;
    interfaceInfoName?: string;
    leftCount?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    totalCount?: number;
    userId?: number;
    userName?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    createTime?: string;
    current?: number;
    gender?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateRequest = {
    email?: string;
    gender?: number;
    id?: number;
    phoneNum?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    email?: string;
    gender?: number;
    id?: number;
    phoneNum?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type View = {
    contentType?: string;
  };
}
