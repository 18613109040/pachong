appLogger ${appInfo.name}-web.log，例如 example-app-web.log，应用相关日志，供应用开发者使用的日志。我们在绝大数情况下都在使用它。
coreLogger egg-web.log 框架内核、插件日志。
errorLogger common-error.log 实际一般不会直接使用它，任何 logger 的 .error() 调用输出的日志都会重定向到这里，重点通过查看此日志定位异常。
agentLogger egg-agent.log agent 进程日志，框架和使用到 agent 进程执行任务的插件会打印一些日志到这里。
